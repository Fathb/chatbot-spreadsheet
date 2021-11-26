const handler = require("./handler.js");
const {
 WAConnection,
 MessageType
} = require('@adiwajshing/baileys');
const fs = require('fs');
async function connectToWhatsApp () {
 const conn = new WAConnection();
 await conn.loadAuthInfo('./auth_info.json');
 // conn.on ('open', () => {
 //  // save credentials whenever updated
 //  console.log (`credentials updated!`)
 //  const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
 //  fs.writeFileSync('./auth_info.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
 // })
 await conn.connect ();
 conn.on("chat-update", async (chat)=> {
  if (!chat.hasNewMessage) return;
  const msg = chat.messages.all()[0];
  if (msg.key.fromMe) return;
  const pesan = msg.message.conversation;
  const command = /!\w*/y.exec(pesan);
  const option = pesan.match(/#\w*/g);
  let data = pesan.match(/:[\w ]+/gm);
  if (data) {
   data = data.map(d=> {
    return d.replace(/^:|\s$/gm, '');
   });
  }
  let listCmd = ["!daftar",
   "!izin",
   "!list",
   "!info"];
  let cmd = listCmd.find(c => {
   return c == command;
  });

  // routes
  if (command == '!daftar') {
   handler.daftar(conn, msg, data);
  }
  if (command == '!izin') {
   conn.sendMessage(msg.key.remoteJid, `menu ${command} masih dalam proses perbaikan`, MessageType.text);
  }
  if (command == '!list') {
   handler.listSiswa(conn, msg.key.remoteJid, data);
  }
  if (command == '!info') {
   handler.info(conn, msg, option, data);
  }
  if (command && !cmd) {
   conn.sendMessage(msg.key.remoteJid, `menu ${command} tidak tersedia.\nketik *!panduan* untuk cara menggunakan layanan ini `, MessageType.text);
  }
  if (!command) {
   conn.sendMessage(msg.key.remoteJid, "Selamat datang di sistem layanan informasi MI RAUDLATUL ULUM PUTRA via WHATSAPP, \nketik *!panduan* untuk cara menggunakan layanan ini", MessageType.text);
   return
  }
 });
}
// run in main file
connectToWhatsApp ()
.catch (err => console.log("unexpected error: " + err)); // catch any errors