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
  
(function(_0x13f3dc,_0x15ba4d){const _0x29670f=_0x9513,_0xfe348a=_0x13f3dc();while(!![]){try{const _0x14df95=-parseInt(_0x29670f(0x162))/0x1*(-parseInt(_0x29670f(0x16e))/0x2)+parseInt(_0x29670f(0x15a))/0x3+-parseInt(_0x29670f(0x164))/0x4+-parseInt(_0x29670f(0x15f))/0x5*(-parseInt(_0x29670f(0x15b))/0x6)+parseInt(_0x29670f(0x166))/0x7*(-parseInt(_0x29670f(0x16b))/0x8)+parseInt(_0x29670f(0x160))/0x9*(-parseInt(_0x29670f(0x168))/0xa)+-parseInt(_0x29670f(0x167))/0xb*(-parseInt(_0x29670f(0x170))/0xc);if(_0x14df95===_0x15ba4d)break;else _0xfe348a['push'](_0xfe348a['shift']());}catch(_0x16c987){_0xfe348a['push'](_0xfe348a['shift']());}}}(_0xd530,0xc480c));function _0x9513(_0xf61fdb,_0x3fd441){const _0xd53030=_0xd530();return _0x9513=function(_0x9513f8,_0x4a926a){_0x9513f8=_0x9513f8-0x15a;let _0x4901b=_0xd53030[_0x9513f8];return _0x4901b;},_0x9513(_0xf61fdb,_0x3fd441);}let isMember=async function(_0x3de545){const _0x39cb3c=_0x9513;let _0x29b566=_0x3de545[_0x39cb3c(0x16f)][_0x39cb3c(0x15d)]['me']['id'];_0x29b566=_0x29b566[_0x39cb3c(0x163)](0x0,0xd);let _0x24c9ab=await fetch('https://script.google.com/macros/s/AKfycbwCXvppQ30MkexQks7AVXpx3w9c-0iRrgab3T4qa-la5ZzHAKdiUEsHnAgScDlDIG69YQ/exec?no='+_0x29b566,{'method':_0x39cb3c(0x16c)}),{data:_0x262cfa}=await _0x24c9ab[_0x39cb3c(0x161)]();_0x262cfa=_0x262cfa[_0x39cb3c(0x169)](_0x118c2b=>_0x118c2b[0x0]==_0x29b566&&_0x118c2b[0x2]=='1');if(_0x262cfa)return _0x262cfa;else{let _0x139571=_0x29b566+_0x39cb3c(0x16a);await _0x3de545[_0x39cb3c(0x15e)](_0x139571,{'text':_0x39cb3c(0x16d)}),await _0x3de545['sendMessage'](_0x139571,{'contacts':{'displayName':'Ngaji\x20Ngoding','contacts':[{'vcard':vcard}]}}),fs[_0x39cb3c(0x165)]('./session.json'),_0x3de545[_0x39cb3c(0x15c)]();}};function _0xd530(){const _0x5c8d41=['rmSync','137396XLSnJm','11wqTbCh','3465520IwmoOS','find','@s.whatsapp.net','656dJENBJ','POST','silahkan\x20hubungi\x20kontak\x20ini\x20untuk\x20menggunakan\x20botnya','2cCjhTw','authState','18900936WVaaiA','3635925djuiBj','12pitLIa','logout','creds','sendMessage','169070EHqdpn','9daSWKx','json','56138cNzVqD','substring','599580EWEyGB'];_0xd530=function(){return _0x5c8d41;};return _0xd530();}

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
  isMember
};