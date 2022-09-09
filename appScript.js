const fetch = require("node-fetch")
function getPdfURL(namafile) {
  let url;
  try {
    fetch('https://script.google.com/macros/s/AKfycbz8y9P0EqMLOfENYLYMtITGOv-am2GhK9-w09WukyB3V3FyZ-EDFoB9SGZavlap6HEraw/exec?namafile='+namafile, {
      method: 'post'
    }).then(res=> {
      console.log(res);
      res.json()}).then(res=> {
      url = res;
      console.log(url);
    })
  } catch (e) {
    console.log(e);
  }
  return url
}
getPdfURL("test")
module.export = {
  getPdfURL
}