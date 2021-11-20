const {
 ss
} = require('./spreadsheet');
const fs = require('fs');
const {
 MessageType
} = require('@adiwajshing/baileys');

module.exports = {
 daftar: async function (conn, msg) {
  var args = msg.message.conversation.split(' ');
  args.splice(0, 1);
  args = args.join(' ');
  args = args.split('-');
  const nama = args[1].toUpperCase();
  args.splice(0, 2);
  var noHP = msg.key.remoteJid.split('@')[0];
  var data = [
   noHP,
   msg.key.remoteJid,
   nama
  ];
  data = data.concat(args)
  // let duplikat = user.find(r=>r.remoteJid == data.remoteJid);
  let duplikat;
  var urlSs = 'https://docs.google.com/spreadsheets/d/1vuKyr1A8Vjnz3O48AE9gHNrTSCZ2oaaMNOc2EWjsp5Q/edit?usp=drivesdk';
  if (!duplikat) {
   ss.addData("data-siswa!$b:f", data);
   conn.sendMessage(msg.key.remoteJid,
    `terima kasih! ${nama} telah terdaftar di sistem kami dengan no hp: ${noHP}. data bisa di lihat di ${urlSs}`,
    MessageType.text);
  } else {
   conn.sendMessage(msg.key.remoteJid, `mohon maaf! no ${noHP} telah digunakan oleh ${duplikat.nama}.`,
    MessageType.text);
  }
 }
};