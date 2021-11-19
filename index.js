const {
 MessageType,
 WAConnection
} = require('@adiwajshing/baileys');
const fs = require('fs');
const {
 ss
} = require('./spreadsheet');
async function connectToWhatsApp () {
 const conn = new WAConnection();
 conn.loadAuthInfo ('./auth_info.json');
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
  const pesan = msg.message.conversation.split(' ');
  const command = pesan[0];
  var options = pesan[1];
  const args = pesan.slice(0, 1);
  if (command == 'daftar') {
   daftarHandler(conn, msg);
  } else {
   conn.sendMessage(msg.key.remoteJid, `format ${command} tidak tersedia`, MessageType.text);
  }
 });
}
//pendaftaran
function daftarHandler(conn, msg) {
 const userBuffer = fs.readFileSync('data/user.json',
  'utf-8');
 var options = msg.message.conversation.split('-')[1];
 let data = {
  remoteJid: msg.key.remoteJid,
  nama: options.toUpperCase()
 }
 const user = JSON.parse(userBuffer);
 let duplikat = user.find(r=>r.remoteJid == data.remoteJid);
 let noHP = msg.key.remoteJid.split('@')[0];
 console.log(duplikat)
 if (!duplikat) {
  user.push(data);
  fs.writeFileSync('data/user.json',
   JSON.stringify(user));
  conn.sendMessage(msg.key.remoteJid,
   `terima kasih! ${data.nama} telah terdaftar di sistem kami dengan no hp: ${noHP}.`,
   MessageType.text);
 } else {
  conn.sendMessage(msg.key.remoteJid, `mohon maaf! no ${noHP} telah digunakan oleh ${duplikat.nama}.`,
   MessageType.text)
 }
}
// run in main file
connectToWhatsApp ()
.catch (err => console.log("unexpected error: " + err)) // catch any errors