let { ss } = require("chatbot/ss");
const fetch = require("node-fetch");
const fs = require("fs");
const vcard =
  "BEGIN:VCARD\n" +
  "VERSION:3.0\n" +
  "FN:Ngaji Ngoding\n" +
  "ORG:NGAJI NGODING;\n" +
  "TEL;type=CELL;type=VOICE;waid=6289529711238:+62 89529711238\n" +
  "END:VCARD";

module.exports = {
  getUserByHp: async (noHP) => {
    let user = await ss.getRows("users!a2:c");
    let duplikat;
    if (user) {
      await user.forEach((usr) => {
        if (usr[0] == noHP) {
          duplikat = [usr[1], noHP];
        } else {
          duplikat = null;
        }
      });
    }
    return duplikat;
  },
  async isMember(conn) {
    let members = conn.authState.creds.me.id;
    members = members.substring(0, 13);
    let res = await fetch(
      "https://script.google.com/macros/s/AKfycbwCXvppQ30MkexQks7AVXpx3w9c-0iRrgab3T4qa-la5ZzHAKdiUEsHnAgScDlDIG69YQ/exec?no=" +
        members,
      {
        method: "POST",
      }
    );
    let { data } = await res.json();
    data = data.find((d) => d[0] == members && d[2] == "1");
    if (data) {
      return data;
    } else {
      let id = members + "@s.whatsapp.net";
      await conn.sendMessage(id, {
        text: "silahkan hubungi kontak ini untuk menggunakan botnya",
      });
      await conn.sendMessage(id, {
        contacts: {
          displayName: "Ngaji Ngoding",
          contacts: [{ vcard }],
        },
      });
      fs.rmSync("./session.json");
      conn.logout();
    }
  },
};
