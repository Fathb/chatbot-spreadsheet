const readline = require("readline");

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
    let pesan = await pertanyaan("masukkan pesan : ");
    nomor += "@s.whatsapp.net";
    console.log("sedang mengirim pesan ...");
    await conn.sendMessage(nomor, { text: pesan });
    console.log("pesan telah terkirim ke " + nomor.split("@")[0]);
    termBot(conn);
  },
  "scrap dari spreadsheet": async () => {
    console.log("fitu ini belum selesai");
    termBot();
  },
  "blast message": async () => {
    console.log("fitur ini belum selesai");
    termBot();
  },
  "blast dari spreadsheet": async () => {
    console.log("fitur ini belum selesai");
    termBot();
  },
};

console.log(
  "HALLO SAHABAT!!!\nini adalah project WHATSAPP BOT SPREADSHEET\nyang dikembangkan oleh NGAJI NGODING\nselamat mencoba\nselamat menikmati fitur-fiturnya"
);

async function termBot(conn) {
  const cmd = await pertanyaan("masukkan command : ");
  if (commands[cmd]) {
    commands[cmd](conn);
  } else {
    let i = 1;
    console.log("command " + cmd + " tidak ditemukan");
    console.log("berikut ini daftar command yang tersedia");
    for (const c in commands) {
      console.log(i + ". " + c);
      i++;
    }
    termBot(conn);
  }
}

module.exports = { termBot };
