const { google } = require("googleapis");
let { keyFileName, sheetId } = require("./config/config.json");

function spreadsheet(keyFile, spreadsheetId) {
  this.spreadsheetId = spreadsheetId;
  this.keyFile = keyFile;
  const auth = new google.auth.GoogleAuth({
    keyFile: this.keyFile,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  //client instance
  const client = auth.getClient();

  //spreadsheets instance
  const googlesheets = google.sheets({
    version: "v4",
    auth: client,
  });
  //'1vuKyr1A8Vjnz3O48AE9gHNrTSCZ2oaaMNOc2EWjsp5Q';

  this.getRows = async function (range) {
    const data = await googlesheets.spreadsheets.values.get({
      auth,
      spreadsheetId: this.spreadsheetId,
      range,
    });
    return data.data.values;
  };
  this.getDataByNama = async function (range, nama) {
    var data = await this.getRows(range);
    const b = await data.find((a) => {
      return a[2] == nama;
    });
    return b;
  };
  this.addData = async function (range, data = []) {
    let res = await googlesheets.spreadsheets.values.append({
      auth,
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [data],
      },
    });
    return res;
  };
}

const ss = new spreadsheet(keyFileName, sheetId);

// async function start() {
//  const b = await ss.getRows("Sheet1!a2:c4");
//  console.log(b);
//  const c = await ss.getDataByNama("Sheet1!a2:c4", "Zakaria");
//  console.log(c);
//  const data = ["1",
//   "Ganjaran",
//   "Yaqdan Siroj"];
//  ss.addData("Sheet1!a:c", data)
// }

// start();
module.exports = {
  ss,
};
