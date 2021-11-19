const {
 google
} = require ('googleapis');

function spreadsheet(keyFile, spreadsheetId) {
 this.spreadsheetId = spreadsheetId;
 this.keyFile = keyFile
 const auth = new google.auth.GoogleAuth({
  keyFile: this.keyFile,
  scopes: 'https://www.googleapis.com/auth/spreadsheets'
 })

 //client instance
 const client = auth.getClient();

 //spreadsheets instance
 const googlesheets = google.sheets({
  version: 'v4', auth: client
 });

 //'1vuKyr1A8Vjnz3O48AE9gHNrTSCZ2oaaMNOc2EWjsp5Q';

 this.getRows = async function(range) {
  const data = await googlesheets.spreadsheets.values.get({
   auth,
   spreadsheetId: this.spreadsheetId,
   range
  });
  return data.data.values
 };
 this.getDataById = async function(range, id) {
  const data = await this.getRows(range).find((a)=>a.id == id);
  return data
 };
 this.addData = function() {};
}

const ss = new spreadsheet("node-spreadsheet-test-332512-f2b8dbb2c308.json", "1vuKyr1A8Vjnz3O48AE9gHNrTSCZ2oaaMNOc2EWjsp5Q");

async function start() {
 const b = await ss.getRows("Sheet1!a2:c4");
 console.log(b)
}

start();
// module.exports = {
//  ss
// };