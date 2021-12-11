const { BrowserWindow, ipcMain, shell, dialog } = require('electron');

const controller = require('./controller.js');

const handleRedirect = (e, url) => {
  if (url !== e.sender.getURL()) {
    e.preventDefault();
    shell.openExternal(url);
  }
};

let dataDirPath = null;

ipcMain.on('setDataDirPath', async (event) => {
  try {
    dataDirPath = dialog.showOpenDialogSync({ properties: ['openDirectory'] })[0];
    let retailers = await controller.getRetailers(dataDirPath);
    event.sender.send('dataDirPathSetted', { dataDirPath, retailers });
  } catch (e) {
    dialog.showMessageBox(null, { type: 'error', title: 'Error', message: 'path is incorrent' });
    console.error(e);
  }
});

ipcMain.on('selectGfiFile', async (event, client) => {
  try {
    let retailerGfiFiles = await controller.getGfiFilePaths(dataDirPath, client);
    event.sender.send('gfiFileSelected', retailerGfiFiles);
  } catch (e) {
    console.error(e);
  }
});

ipcMain.on('mergeGfiFiles', async (event, client) => {
  try {
    let mergedFilePath = await controller.mergeGfiFile(dataDirPath, client);
    //console.log(client.selectedGfiFiles);
  } catch (e) {
    console.error(e);
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
