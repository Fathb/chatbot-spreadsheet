const {
 google
} = require ('googleapis');

async function start() {
 const auth = new google.auth.GoogleAuth({
  keyFile: 'node-spreadsheet-test-332512-f2b8dbb2c308.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets'
 })

 //client instance
 const client = await auth.getClient();

 //spreadsheets instance
 const googlesheets = google.sheets({
  version: 'v4', auth: client
 });

 const spreadsheetId = '1vuKyr1A8Vjnz3O48AE9gHNrTSCZ2oaaMNOc2EWjsp5Q';

 const rows = await googlesheets.spreadsheets.values.get({
  auth,
  spreadsheetId,
  range:'Sheet1!a2:c5'
 })

 console.log(rows.data);
}

start();