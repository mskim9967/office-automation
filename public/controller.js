const { app } = require('electron');
const path = require('path');
const ExcelJS = require('exceljs');
const fs = require('fs');
const languageEncoding = require('detect-file-encoding-and-language');

const txt2str = async (txtFilePath) => {
  try {
    return fs.readFileSync(path.join(txtFilePath, 'retailer.txt'), (await languageEncoding(path.join(txtFilePath, 'retailer.txt'))).encoding);
  } catch (err) {
    return err;
  }
};

const getRetailers = async (inputDirPath) => {
  let retailers = {};
  let retailersBuf = (await txt2str(inputDirPath)).split('\n');
  for (let line of retailersBuf) {
    let temp = line.replace(/\s+$/g, '').split('\t');
    retailers[temp[0]] = { code: temp[0], name: temp[1] };
  }

  return retailers;
};

const getGfiFilePaths = async (inputDirPath, client) => {
  const GFI = Object.freeze({ RETAILER_CODE: 1, WEEK: 2, VERSION: 3 });
  const gfiFileNameRegex = /^([0-9]+)_([0-9]+)_([0-9]+).*\.GF_$/;
  const gfiFilePaths = [];

  try {
    // order by version descending
    const gfiDir = fs.readdirSync(path.join(inputDirPath, 'gfi')).sort().reverse();
    let weekCheck = {};
    for (let gfiFileName of gfiDir) {
      const regexMatch = gfiFileName.match(gfiFileNameRegex);

      // filtering by filename
      if (!regexMatch || regexMatch[GFI.RETAILER_CODE] !== client.selectedRetailerCode) continue;
      //filtering by month
      if (regexMatch[GFI.WEEK] < client.startWeek || regexMatch[GFI.WEEK] > client.endWeek) continue;

      const size = fs.statSync(path.join(inputDirPath, 'gfi', gfiFileName)).size;
      let isDefault = false;
      if (size && !weekCheck[regexMatch[GFI.WEEK]]) {
        weekCheck[regexMatch[GFI.WEEK]] = true;
        isDefault = true;
      }
      gfiFilePaths.push({
        id: path.join(inputDirPath, 'gfi', gfiFileName),
        path: path.join(inputDirPath, 'gfi', gfiFileName),
        name: gfiFileName,
        week: regexMatch[GFI.WEEK],
        version: regexMatch[GFI.VERSION],
        size,
        isDefault,
      });
    }
    return gfiFilePaths;
  } catch (e) {
    return e.toString();
  }
};

const mergeGfiFile = async (inputDirPath, client) => {
  try {
    const mergedGfiFilePath = path.join(inputDirPath, 'mergedGfi');

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet');
    if (!fs.existsSync(mergedGfiFilePath)) fs.mkdirSync(mergedGfiFilePath, { mode: 0o777 });

    await workbook.xlsx.writeFile(path.join(mergedGfiFilePath, `dldlektest.xlsx`));
    return path.join(mergedGfiFilePath, `dldlektest.xlsx`);
  } catch (e) {
    return e.toString();
  }
};

module.exports = {
  getRetailers,
  getGfiFilePaths,
  mergeGfiFile,
};
