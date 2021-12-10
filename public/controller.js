const { app } = require('electron');
const path = require('path');
const ExcelJS = require('exceljs');
const fs = require('fs');

const baseUrl = path.resolve(app.getPath('exe'), '..', '..', '..', '..');

const mergeGfi = async () => {
  try {
    console.log('eeeesaaasddsf');
    // const workbook = new ExcelJS.Workbook();
    // const sheet = workbook.addWorksheet('My Sheet');
    fs.mkdirSync(path.resolve(baseUrl, 'newdir'), { mode: 0o777 });
    // await workbook.xlsx.writeFile(`${baseUrl}/newdir/dldlektest.xlsx`);
    return baseUrl;
  } catch (e) {
    return e.toString();
  }
};

module.exports = {
  mergeGfi,
};
