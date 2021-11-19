// const {
//  ss
// } = require('./spreadsheet');
const fs = require('fs');
const {MessageType} = require('@adiwajshing/baileys');

module.exports = {
 daftar: async function (conn, msg) {
  const userBuffer = fs.readFileSync('data/user.json',
   'utf-8');
  var options = msg.message.conversation.split('-')[1];
  let data = {
   remoteJid: msg.key.remoteJid,
   nama: options.toUpperCase()
  };
  const user = JSON.parse(userBuffer);
  // let duplikat = user.find(r=>r.remoteJid == data.remoteJid);
  let duplikat;
  let noHP = msg.key.remoteJid.split('@')[0];
  if (!duplikat) {
   user.push(data);
   fs.writeFileSync('data/user.json',
    JSON.stringify(user));
   conn.sendMessage(msg.key.remoteJid,
    `terima kasih! ${data.nama} telah terdaftar di sistem kami dengan no hp: ${noHP}.`,
    MessageType.text);
  } else {
   conn.sendMessage(msg.key.remoteJid, `mohon maaf! no ${noHP} telah digunakan oleh ${duplikat.nama}.`,
    MessageType.text);
  }
 }
};