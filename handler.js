const fetch = require("node-fetch");
const { ss } = require("./spreadsheet");
const fs = require("fs");
const { MessageType } = require("@adiwajshing/baileys");
let helper = require("./helper");
let { sheetName } = require("./config/config.json");

// async function daftar(conn, msg, args) {
//   if (!args) {
//     conn.sendMessage(msg.key.remoteJid, {
//       text: `ketik *!panduan* untuk panduan secara umum\nketik *!info #pendaftaran* untuk pendaftaran siswa baru`,
//     });
//     return;
//   }
//   var noHP = msg.key.remoteJid.split("@")[0];
//   var data = [noHP];
//   data = data.concat(args);
//   let user = await ss.getRows("users!a2:c");
//   let duplikat;
//   if (user) {
//     await user.forEach((usr) => {
//       if (usr[0] == noHP) {
//         duplikat = [usr[1], noHP];
//       }
//     });
//   }
//   if (!duplikat) {
//     ss.addData("users!$a:c", data);
//     conn.sendMessage(msg.key.remoteJid, {
//       text: `terima kasih! ${args[0]} telah terdaftar di sistem kami dengan no hp: ${noHP}.`,
//     });
//   } else {
//     conn.sendMessage(msg.key.remoteJid, {
//       text: `mohon maaf! no ${noHP} telah digunakan oleh ${duplikat[0]}.`,
//     });
//   }
// }

module.exports = {
  async input(conn, msg, sheet, data) {
    if (!sheet || !data) return;
    console.log(sheet);
    sheet = sheet[0].substring(1);
    let res = await ss.addData(sheet + "!C2", data);
    conn.sendMessage(msg.key.remoteJid, { text: res.statusText });
  },
  async info(){
    console.log("menu info belum di buat");
  }
  // daftar,
  // async formulir(conn, msg, data) {
  //   var noHP = msg.key.remoteJid.split("@")[0];
  //   data.unshift(null, null);
  //   await ss.addData(sheetName + "!C", data);
  //   fetch(
  //     "https://script.google.com/macros/s/AKfycbwCXvppQ30MkexQks7AVXpx3w9c-0iRrgab3T4qa-la5ZzHAKdiUEsHnAgScDlDIG69YQ/exec?namafile=" +
  //       data[4],
  //     {
  //       method: "post",
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //       conn.sendMessage(msg.key.remoteJid, {
  //         text: `terma kasih telah mendaftar di MI Raudlatul Ulum Putra\nsiapkan berkas-berkas persyaratan (FC KK, FC akte kelahiran kelahiran, dan foto 3x4)\nformulir bisa dilihat di ${res}`,
  //       });
  //       daftar(conn, msg, [data[2], data[6]]);
  //     });
  // },
  // izin(sendMessage, msg, args) {},
  // listSiswa: async function (conn, remoteJid, args) {
  //   if (args == null) {
  //     conn.sendMessage(remoteJid, {
  //       text: `ketik *!panduan* untuk panduan secara umum\nketik *!info #pendaftaran* untuk pendaftaran siswa baru`,
  //     });
  //     return;
  //   }
  //   let listSiswa = await ss.getRows("data-siswa!a2:b219");
  //   var ls = [];
  //   var i = 1;
  //   listSiswa.forEach((a) => {
  //     if (a[1] == args[0].toUpperCase()) {
  //       ls.push(`${i++} ${a[0]}`);
  //     }
  //   });
  //   conn.sendMessage(
  //     remoteJid,
  //     ls.toString().replace(/,/gm, "\n"),
  //     MessageType.text
  //   );
  // },
  // async info(conn, msg, option, args) {
  //   if (option == null) {
  //     conn.sendMessage(msg.key.remoteJid, {
  //       text: `ketik *!panduan* untuk panduan secara umum\nketik *!info #pendaftaran* untuk pendaftaran siswa baru`,
  //     });
  //     return;
  //   }
  //   if (option[0].toLowerCase() == "#jadwal") {
  //     if (args == null || args.length < 2) {
  //       conn.sendMessage(msg.key.remoteJid, {
  //         text: `ketik *!panduan* untuk panduan secara umum\nketik *!info #pendaftaran* untuk pendaftaran siswa baru`,
  //       });
  //       return;
  //     }
  //     let jadwal = await ss.getRows("jadwal!a2:e349");
  //     let dataJadwal = [];
  //     let i = 1;
  //     await jadwal.forEach((jdw) => {
  //       if (
  //         jdw[1].toLowerCase() == args[0].toLowerCase() &&
  //         jdw[0].toLowerCase() == args[1].toLowerCase()
  //       ) {
  //         dataJadwal.push([i++, jdw[2], jdw[3], jdw[4]]);
  //       }
  //     });
  //     conn.sendMessage(
  //       msg.key.remoteJid,
  //       dataJadwal.toString().replace(/,/gm, "\n"),
  //       MessageType.text
  //     );
  //   }
  // if (option[0].toLowerCase() == "#jadwalpas") {
  //   let jadwal = await ss.getRows("jadwalpas!a2:e86");
  //   let dataJadwal = [];
  //   let i = "___________";
  //   await jadwal.forEach(jdw=> {
  //     if (jdw[0] == args[0]) {
  //       dataJadwal.push([i, jdw[1], jdw[2], jdw[3], jdw[4]]);
  //     }
  //   })
  //   conn.sendMessage(msg.key.remoteJid,
  //     dataJadwal.toString().replace(/,/gm, '\n'),
  //     MessageType.text);
  // }
  // if (option[0].toLowerCase() == "#pembayaran") {
  // cek no hp exist
  //     let noHP = msg.key.remoteJid.split("@")[0];
  //     let dataUsers = await ss.getRows("users!a2:c");
  //     let userExist;
  //     if (dataUsers) {
  //       dataUsers.forEach((usr) => {
  //         if (usr[0] == noHP) {
  //           userExist = usr;
  //         }
  //       });
  //     }
  //     if (!userExist) {
  //       conn.sendMessage(msg.key.remoteJid, {
  //         text: "no anda belum terdaftar!",
  //       });
  //       return;
  //     }
  //     let dataPembayaranUser = [];
  //     if (userExist) {
  //       let dataPembayaran = await ss.getRows("pembayaran!a3:o");
  //       let n = 1;
  //       await dataPembayaran.forEach((byr) => {
  //         if (byr[2] == userExist[1]) {
  //           dataPembayaranUser.push([
  //             byr[3],
  //             parseInt(byr[5]) * 1000,
  //             parseInt(byr[6]) * 1000,
  //             parseInt(byr[7]) * 1000,
  //             parseInt(byr[8]) * 1000,
  //             parseInt(byr[9]) * 1000,
  //             parseInt(byr[10]) * 1000,
  //             parseInt(byr[11]) * 1000,
  //             parseInt(byr[12] * 1000),
  //           ]);
  //         }
  //       });
  //     }
  //     let totalTghTh;
  //     let totalBayar;
  //     if (userExist[2] == "3" || userExist[2] == "2") {
  //       totalTghTh = 435000;
  //     }
  //     if (userExist[2] == "5" || userExist[2] == "4") {
  //       totalTghTh = 495000;
  //     }
  //     if (
  //       userExist[2] == "6" ||
  //       userExist[2].toUpperCase() == "6B" ||
  //       userExist[2].toUpperCase() == "6A"
  //     ) {
  //       totalTghTh = 1140000;
  //     }
  //     if (userExist[2] == "1") {
  //       totalTghTh = 560000;
  //     }
  //     if (dataPembayaranUser.length > 0) {
  //       dataPembayaranUser.forEach((dpu) => {
  //         totalTghTh = totalTghTh - (dpu[8] - dpu[7]);
  //         dpu[0] = "tanggal : " + dpu[0];
  //         dpu[1] = "raport : " + dpu[1];
  //         dpu[2] = "LKS : " + dpu[2];
  //         dpu[3] = "PTS : " + dpu[3];
  //         dpu[4] = "PAS/PAT : " + dpu[4];
  //         dpu[5] = "IURAN AKHIR TAHUN : " + dpu[5];
  //         dpu[6] = "KOSTIM : " + dpu[6];
  //         dpu[7] = "INFAQ : " + dpu[7];
  //         dpu[8] = "TOTAL : " + dpu[8] + "\n";
  //       });
  //     }
  //     if (totalTghTh == 0) {
  //       totalTghTh = "LUNAS";
  //     }
  //     if (dataPembayaranUser.length > 0) {
  //       conn.sendMessage(msg.key.remoteJid, {
  //         text:
  //           `data pembayaran siswa atas nama ${userExist[1]}\n\n` +
  //           dataPembayaranUser.toString().replace(/,/gm, "\n") +
  //           `\nsisa tagihan tahunan = ${totalTghTh}`,
  //       });
  //     } else if (dataPembayaranUser.length <= 0) {
  //       conn.sendMessage(msg.key.remoteJid, {
  //         text: `data pembayaran siswa atas nama ${userExist[1]} tidak ditemukan silahkan konfirmasi ke tu keuangan dengan kwitansi pembayaran`,
  //       });
  //     }
  //   }
  //   if (option[0].toLowerCase() == "#pendaftaran") {
  //     conn.sendMessage(msg.key.remoteJid, {
  //       text: `silahkan isi folmulir berikut ini!.\ncopy, kemudian ganti sesuai data calon siswa\njangan mengubah apapun kecuali data calon siswa`,
  //     });
  //     setTimeout(function () {
  //       conn.sendMessage(msg.key.remoteJid, {
  //         text: `!formulirppdb\n\n*DATA SISWA*\n\nNO KK\t\t:no kk calon siswa\nNO NIK\t\t:no NIK calon siswa\nnama\t\t\t:nama calon siswa\ntempat lahir\t:tempat lahir calon siswa\ntanggal lahir\t :tanggal lahir calon siswa\nsekolah asal\t:sekolah asal calon siswa\nalamat\t\t:alamat calon siswa\nDomisili\t\t:Domisili calon siswa\nAnak ke\t\t\t:nomor\nJumlah Saudara\t\t\t:nomor\nCita-cita\t\t:cita-cita calon siswa\nHobi\t\t\t:hobi calon siswa\nmasuk kelas\t:kelas\n\n*DATA ORANG TUA*\n*DATA AYAH*\nno NIK\t\t\t\t:no NIK ayah\nnama\t\t\t:nama ayah\ntempat lahir\t:tempat lahir ayah\ntanggal lahir\t :tanggal lahir ayah\nalamat\t\t\t:alamat ayah\npendidikan terakhir\t:pendidikan ayah\npekerjaan\t\t:pekerjaan ayah\npenghasilan\t\t:penghasilan ayah\nDomisili\t\t:Domisili ayah\n\n*DATA IBU*\nno NIK\t\t :no NIK ibu\nnama\t\t\t:nama ibu\ntempat lahir\t:tempat lahir ibu\ntanggal lahir\t :tanggal lahir ibu\nalamat\t\t\t:alamat ibu\npendidikan terakhir\t:pendidikan ibu\npekerjaan\t\t:pekerjaan ibu\npenghasilan\t\t:penghasilan ibu\nDomisili\t\t:Domisili ibu\n\n*DATA WALI* (jika ada)\nNama\t\t\t:nama wali\nAlamat\t\t:alamat wali\nKontak\t\t\t:kontak (no hp/wa/email/dll)\n\n*catatan*\n- pastikan data di atas benar sesuai *KK* dan akte kelahiran *siswa*\n- 1 nomor hanya bisa digunakan 1 kali pendaftaran.\n`,
  //       });
  //     }, 2000);
  //   }
  // },
};
