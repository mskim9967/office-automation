const { BrowserWindow, ipcMain, shell, dialog } = require('electron');

const controller = require('./controller.js');

const handleRedirect = (e, url) => {
  if (url !== e.sender.getURL()) {
    e.preventDefault();
    shell.openExternal(url);
  }
};

const inputUrl = null;

ipcMain.on('setInputDirPath', async (event, data) => {
  try {
    const inputDirPath = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
    event.sender.send('trigInputDirPath', inputDirPath);
  } catch (e) {
    console.log(e);
  }
});

ipcMain.on('setOutputDirPath', async (event, data) => {
  try {
    const outputDirPath = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
    event.sender.send('trigOutputDirPath', outputDirPath);
  } catch (e) {
    console.log(e);
  }
});

ipcMain.on('openWin', async (event, data) => {
  try {
    const win = new BrowserWindow({
      webPreferences: {
        nativeWindowOpen: true,
      },
    });
    win.webContents.on('will-navigate', handleRedirect);
    win.loadURL('http://google.com');
    console.log(dialog.showOpenDialogSync({ properties: ['openDirectory'] }));

    //let url = await controller.mergeGfi();
    //event.sender.send('url-reply', 'wesfdfdsfds ' + url);
  } catch (e) {
    console.log(e);
  }
});

module.exports = ipcMain;
