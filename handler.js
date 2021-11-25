const {
 ss
} = require('./spreadsheet');
const fs = require('fs');
const {
 MessageType
} = require('@adiwajshing/baileys');

module.exports = {
 daftar: async function (conn, msg, args) {
  if (!args) return;
  var noHP = msg.key.remoteJid.split('@')[0];
  var data = [
   noHP
  ];
  data = data.concat(args);
  let user = await ss.getRows("users!a2:c");
  let duplikat;
  if (user) {
   await user.forEach(usr=> {
    if (usr[0] == noHP) {
     duplikat = [usr[1],
      noHP];
    }
   });
  }
  if (!duplikat) {
   ss.addData("users!$a:c", data);
   conn.sendMessage(msg.key.remoteJid,
    `terima kasih! ${args[0]} telah terdaftar di sistem kami dengan no hp: ${noHP}.`,
    MessageType.text);
  } else {
   conn.sendMessage(msg.key.remoteJid, `mohon maaf! no ${noHP} telah digunakan oleh ${duplikat[0]}.`,
    MessageType.text);
  }
 },
 izin(sendMessage, msg, args) {},
 listSiswa: async function(conn, remoteJid, args) {
  let listSiswa = await ss.getRows("data-siswa!a2:b219");
  var ls = [];
  var i = 1;
  listSiswa.forEach(a=> {
   if (a[1] == args[0]) {
    ls.push(`${i++} ${a[0]}`);
   }
  });
  conn.sendMessage(remoteJid,
   ls.toString().replace(/,/gm, '\n'),
   MessageType.text);
 },
 async info(conn,
  msg,
  option,
  args) {
  // cek user exist
  let noHP = msg.key.remoteJid.split("@")[0];
  let listNoHp = await ss.getRows('users!a2:a');
  if (option[0].toLowerCase() == "#jadwal") {
   let jadwal = await ss.getRows("jadwal!a2:e349");
   let dataJadwal = [];
   var i = 1;
   await jadwal.forEach(jdw=> {
    if (jdw[1] == args[0] && jdw[0] == args[1]) {
     dataJadwal.push([`${i++} | ${jdw[1]} | ${jdw[2]} | ${jdw[3]} | ${jdw[4]}`]);
    }
   })
   console.log(dataJadwal);
   conn.sendMessage(msg.key.remoteJid,
    dataJadwal.toString().replace(/,/gm, '\n'),
    MessageType.text);
  }
 }
};