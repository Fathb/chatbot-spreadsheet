let { ss } = require("./spreadsheet");
const fetch = require("node-fetch");
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
    console.log(members);
    let res = await fetch(
      "https://script.google.com/macros/s/AKfycbwCXvppQ30MkexQks7AVXpx3w9c-0iRrgab3T4qa-la5ZzHAKdiUEsHnAgScDlDIG69YQ/exec?no=" +
        members,
      {
        method: "POST",
      }
    );
    let { data } = await res.json();
    console.log(data[0][0]);
    data = data.find((d) => d[0] == members && d[2] == "1");
    if (data) {
      return data;
    }else{
      console.log("silahkan hubungi 6289529711238 untuk penggunaan bot ini");
      conn.logout();
    }
  },
};
