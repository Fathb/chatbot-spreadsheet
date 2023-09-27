const readline = require("readline");
const { exec } = require("child_process");
const { ss } = require("chatbot/ss");
const fs = require("fs");
const config = require("../config/config.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function pertanyaan(kalimat) {
  return new Promise((resolve, reject) => {
    rl.question(kalimat, (text) => {
      resolve(text);
    });
  });
}

let blast = JSON.parse(fs.readFileSync("config/blast.json"));
const commands = {
  kembali: (conn) => {
    termBot(conn);
  },
  "cek nomor": async (conn) => {
    let nomor = await pertanyaan("masukkan nomor wa nya : ");
    nomor = nomor.split(",");
    let i = 0;
    for (let el of nomor) {
      let [hasil] = await conn.onWhatsApp(el);
      if (hasil?.exists) {
        console.log(nomor[i] + " terdaftar di WA");
        blast["no tujuan"].push(hasil?.jid?.split("@")[0]);
      } else {
        console.log(nomor[i] + " tidak terdaftar di WA");
      }
      i++;
    }
    let simpan = await pertanyaan("y/n (default n) simpan hasi? : ");
    if (simpan == "y") {
      fs.writeFileSync("config/blast.json", JSON.stringify(blast));
    }
    blast = JSON.parse(fs.readFileSync("config/blast.json"));
    termBot(conn);
  },
  "kirim pesan": async (conn) => {
    let nomor = await pertanyaan("masukkan nomor tujuan : ");
    [nomor] = await conn.onWhatsApp(nomor);
    if (nomor?.exists) {
      let pesan = await pertanyaan("masukkan pesan : ");
      console.log("sedang mengirim pesan ...");
      await conn.sendMessage(nomor.jid, { text: pesan });
      console.log("pesan telah terkirim ke " + nomor.jid.split("@")[0]);
    } else {
      console.log(`no yg anda masukkan tidak terdaftar di WA`);
    }
    termBot(conn);
  },
  "scrap dari spreadsheet": async (conn) => {
    if (!config.spreadsheet) {
      console.log("spreadsheet tidak aktif");
      termBot(conn);
      return;
    }
    let numbers = await ss.getRows("scrap!A2:B");
    let b = 2;
    for (let i of numbers) {
      if (!i[1]) {
        let [no] = await conn.onWhatsApp(i[0]);
        if (no?.exists) {
          console.log(i[0] + " terdaftar di WA");
          ss.addData("scrap!B" + b, ["terdaftar di WA"]);
        } else {
          console.log(i[0] + " tidak terdaftar di WA");
          ss.addData("scrap!B" + b, ["tidak terdaftar di WA"]);
        }
      } else {
        console.log(i[0] + " " + i[1]);
      }
      b += 1;
    }
    termBot(conn);
  },
  "blast message": async (conn) => {
    if (!blast["no tujuan"].length) {
      console.log("no tujuan kosong, jalankan command cek nomor dulu");
      termBot(conn);
      return;
    }
    if (blast.pesan == "") {
      let message = await pertanyaan("masukkan pesan : ");
      blast.pesan = message;
    }
    for (const el of blast["no tujuan"]) {
      console.log(el);
      if (el) {
        await conn.sendMessage(el + "@s.whatsapp.net", { text: blast.pesan });
      }
    }
    let simpan = await pertanyaan("y/n (default n) simpan pesan? : ");
    if (simpan == "y") {
      fs.writeFileSync("config/blast.json", JSON.stringify(blast));
    }
    blast = JSON.parse(fs.readFileSync("config/blast.json"));
    termBot(conn);
  },
  "blast dari spreadsheet": async (conn) => {
    if (!config.spreadsheet) {
      console.log("spreadsheet tidak aktif");
      termBot(conn);
      return;
    }
    let data = await ss.getRows("scrap!a2:d");
    let r = 2;
    console.log("sedang mengirim pesan .......");
    for (let d of data) {
      if (!d[3]) {
        let [n] = await conn.onWhatsApp(d[0]);
        if (n?.exists) {
          await conn.sendMessage(n.jid, { text: d[2] });
          ss.addData("scrap!d" + r, ["pesan terkirim"]);
        } else {
          ss.addData("scrap!d" + r, ["pesan tidak terkirim, nomor salah"]);
        }
      } else {
        console.log(d[3]);
      }
      r += 1;
    }
    console.log("mengirim pesan selesai ......");
    termBot(conn);
  },
  menu: async (conn) => {
    let i = 0;
    console.log("berikut ini daftar command yang tersedia");
    for (const c in commands) {
      console.log(i + ". " + c);
      i++;
    }
    termBot(conn);
  },
  clear: (conn) => {
    exec("clear", (error, stdout, stderr) => {
      if (error) {
        console.log(error.message);
      }
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.log(stderr);
      }
      termBot(conn);
    });
  },
  exit: () => {
    process.exit();
  },
};

console.log(
  "HALLO SAHABAT!!!\nini adalah project WHATSAPP BOT SPREADSHEET\nyang dikembangkan oleh NGAJI NGODING\nselamat mencoba\nselamat menikmati fitur-fiturnya"
);
//let i = 0;
//console.log("berikut ini daftar command yang tersedia");
//for (const c in commands) {
//  console.log(i + ". " + c);
//  i++;
//}

async function termBot(conn) {
  const cmd = await pertanyaan("masukkan command : ");
  let keys = Object.keys(commands);
  if (commands[keys[cmd]] || commands[cmd]) {
    if (commands[cmd]) {
      commands[cmd](conn);
    } else {
      commands[keys[cmd]](conn);
    }
  } else {
    console.log("commands " + cmd + " tidak ditemukan");
    commands["menu"](conn);
  }
}

module.exports = { termBot };
