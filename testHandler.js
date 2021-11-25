const {
 ss
} = require('./spreadsheet');
let listSiswa = async function(args) {
 console.log(args[0])
 let listSiswa = await ss.getRows("data-siswa!a2:b31");
 var ls = [];
 listSiswa.forEach(a=> {
  if (a[1] == args[0]) {
   ls.push(a);
  }
 });
 console.log(ls);
};

listSiswa(["6A"]);