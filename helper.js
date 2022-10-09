const querystring = require("node:querystring");
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

async function isMember(id) {
  let members = id;
  if (!members) return;
  let res = await fetch(
    "https://script.google.com/macros/s/AKfycbx4grTltlI2JZlIprvTN1VmWMWTE6PXglX7ivTedTS_l1yd8DEbdbJQy_YkJJshCG68/exec?command=sembarang",
    {
      method: "POST",
    }
  );
  let { data } = await res.json();
  members = members.substring(0, 13);
  data = data.find((d) => d[0] == members);
  if (!data) {
    let params = {
      command: "addData",
      no: members,
    };
    params = querystring.stringify(params);
    data = await fetch(
      "https://script.google.com/macros/s/AKfycbx4grTltlI2JZlIprvTN1VmWMWTE6PXglX7ivTedTS_l1yd8DEbdbJQy_YkJJshCG68/exec?" +
        params,
      { method: "POST" }
    );
    data = await data.json();
    data = data.row[0];
    return data;
  } else {
    return data;
  }
}

module.exports = {
  getUserByHp: async (noHP) => {
    let user = await ss.getRows("users!a2:c");
    let duplikat;
    if (user) {
      await user.forEach((usr) => {
        if (usr[0] == noHP) {
          duplikat = [usr];
        }
      });
    }
    return duplikat;
  },
  isMember,
};
