const readline = require("readline");
const { exec } = require("child_process");
const { ss } = require("chatbot/ss");

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

const commands = {
  kembali: (conn) => {
    termBot(conn);
  },
  "cek nomor": async (conn) => {
    let nomor = await pertanyaan("masukkan nomor wa nya : ");
    nomor = nomor.split(",");
    let result = [];
    for (let el of nomor) {
      let [hasil] = await conn.onWhatsApp(el);
      result.push(hasil);
    }
    let i = 0;
    for (let el of result) {
      if (el?.exists) {
        console.log(nomor[i] + " terdaftar di whatsapp");
      } else {
        console.log(nomor[i] + " tidak terdaftar di whatsapp");
      }
      i++;
    }
    termBot(conn);
  },
  "kirim pesan": async (conn) => {
    let nomor = await pertanyaan("masukkan nomor tujuan : ");
    nomor = await conn.onWhatsApp(nomor);
    if (nomor.exists) {
      let pesan = await pertanyaan("masukkan pesan : ");
      console.log("sedang mengirim pesan ...");
      await conn.sendMessage(nomor.jid, { text: pesan });
      console.log("pesan telah terkirim ke " + nomor.split("@")[0]);
    } else {
      console.log(`no yg anda masukkan tidak terdaftar di WA`);
    }
    termBot(conn);
  },
  "scrap dari spreadsheet": async (conn) => {
    let numbers = await ss.getRows("scrap!A2:A");
    let result = [];
    for (let i of numbers) {
      let [no] = await conn.onWhatsApp(i[0]);
      if (no?.exists) {
        console.log(i[0] + " terdaftar di WA");
      } else {
        console.log(i[0] + " tidak terdaftar di WA");
      }
    }
    termBot(conn);
  },
  "blast message": async (conn) => {
    console.log("fitur ini belum selesai");
    termBot(conn);
  },
  "blast dari spreadsheet": async (conn) => {
    console.log("fitur ini belum selesai");
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
let i = 0;
console.log("berikut ini daftar command yang tersedia");
for (const c in commands) {
  console.log(i + ". " + c);
  i++;
}

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
