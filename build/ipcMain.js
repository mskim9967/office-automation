const { BrowserWindow, ipcMain, shell } = require('electron');

const controller = require('./controller.js');

const handleRedirect = (e, url) => {
  if (url !== e.sender.getURL()) {
    e.preventDefault();
    shell.openExternal(url);
  }
};

ipcMain.on('test', async (event, data) => {
  try {
    const win = new BrowserWindow({
      webPreferences: {
        nativeWindowOpen: true,
      },
    });
    win.webContents.on('will-navigate', handleRedirect);
    win.loadURL('http://google.com');

    let url = await controller.mergeGfi();
    event.sender.send('url-reply', 'wesfdfdsfds ' + url);
  } catch (e) {
    console.log(e);
  }
});

module.exports = ipcMain;
