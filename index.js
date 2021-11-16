const {MessageType, WAConnection } = require('@adiwajshing/baileys');
const fs = require('fs');

async function connectToWhatsApp () {
    const conn = new WAConnection();
    await conn.loadAuthInfo ('./auth_info.json');
    await conn.connect ();
    conn.on("chat-update", chat=>{
        if(!chat.hasNewMessage) return;
        const msg = chat.messages.all()[0];
        if (msg.key.fromMe) return;
        if (msg.message.conversation == "daftar") {
           conn.sendMessage(msg.key.remoteJid, "selamat anda terdaftar", MessageType.text); 
        };
    })
}
// run in main file
connectToWhatsApp ()
.catch (err => console.log("unexpected error: " + err) ) // catch any errors