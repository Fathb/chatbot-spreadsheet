const {
 MessageType,
 WAConnection
} = require('@adiwajshing/baileys');
const fs = require('fs');

async function connectToWhatsApp () {
 const conn = new WAConnection();
 await conn.loadAuthInfo ('./auth_info.json');
 await conn.connect ();
 conn.on("chat-update", chat=> {
  if (!chat.hasNewMessage) return;
  const msg = chat.messages.all()[0];
  if (msg.key.fromMe) return;
  const commands = msg.message.conversation.split(' ')[0];
  let options;
  const args = msg.message.conversation.split(' ')[2];

  if (commands == "daftar") {
   const userBuffer = fs.readFileSync('data/user.json', 'utf8');
   options = msg.message.conversation.split('-')[1];
   const data = {
    remoteJid: msg.key.remoteJid,
    nama: options
   }
   const user = JSON.parse(userBuffer);
   console.log(user);
   user.push(data);
   fs.writeFileSync('data/user.json', JSON.stringify(user));
   conn.sendMessage(msg.key.remoteJid, `terima kasih! ${options} telah terdaftar di sistem kami.`, MessageType.text);
  }
  // if (msg.message.conversation == "list") {
  //  conn.sendMessage(msg.key.remoteJid, button, MessageType.listMessage);
  // }
  // if (msg.message.conversation == "button") {
  //  conn.sendMessage(msg.key.remoteJid, buttonMessage, MessageType.buttonsMessage);
  // }
 })
}
// run in main file
connectToWhatsApp ()
.catch (err => console.log("unexpected error: " + err)) // catch any errors