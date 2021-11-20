const handler = require("./handler.js");
const {
 WAConnection,
 MessageType
} = require('@adiwajshing/baileys');
const fs = require('fs');
async function connectToWhatsApp () {
 const conn = new WAConnection();
 conn.loadAuthInfo('./auth_info.json')
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
   handler.daftar(conn, msg);
  } else {
   conn.sendMessage(msg.key.remoteJid, `format ${command} tidak tersedia`, MessageType.text);
  }
 });
}
// run in main file
connectToWhatsApp ()
.catch (err => console.log("unexpected error: " + err)); // catch any errors