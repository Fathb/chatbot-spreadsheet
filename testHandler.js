const {
 ss
} = require('./spreadsheet');
let listSiswa = async function() {
 let noHP = '6285743878921';
 let dataUsers = await ss.getRows('users!a2:b');
 let userExist;
 dataUsers.forEach(usr=> {
  if (usr[0] == noHP) {
   userExist = usr;
  }
 });
 if (!userExist) {
  // kirim pesan
  return;
 }
 let dataPembayaranUser = [];
 if (userExist) {
  let dataPembayaran = await ss.getRows("pembayaran!a3:o");
  var i = 1;
  await dataPembayaran.forEach(byr=> {
   if (byr[2] == userExist[1]) {
    dataPembayaranUser.push(byr);
   }
  });
 }
 if (dataPembayaranUser.length > 0) {}
 dataPembayaranUser.map(dpu=> {
  dpu[5] = parseInt(dpu[5]*1000);
  dpu[6] = parseInt(dpu[6])*1000;
  dpu[7] = parseInt(dpu[7])*1000;
  dpu[8] = parseInt(dpu[8])*1000;
  dpu[9] = parseInt(dpu[9])*1000;
  dpu[10] = parseInt(dpu[10])*1000;
  dpu[11] = parseInt(dpu[11])*1000;
  dpu[12] = parseInt(dpu[12])*1000;
  return dpu;
 });
 console.log(dataPembayaranUser);
};

listSiswa();