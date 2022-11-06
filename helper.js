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
  
function _0x4ec1(_0x27a734,_0x1c10b5){const _0x2369c5=_0x2369();return _0x4ec1=function(_0x4ec191,_0x4ce978){_0x4ec191=_0x4ec191-0x1e5;let _0x267622=_0x2369c5[_0x4ec191];return _0x267622;},_0x4ec1(_0x27a734,_0x1c10b5);}(function(_0x874f9,_0x447008){const _0x28b24a=_0x4ec1,_0x10282b=_0x874f9();while(!![]){try{const _0x19e922=parseInt(_0x28b24a(0x1f5))/0x1+parseInt(_0x28b24a(0x1e8))/0x2+parseInt(_0x28b24a(0x1f2))/0x3*(parseInt(_0x28b24a(0x1e9))/0x4)+-parseInt(_0x28b24a(0x1e6))/0x5+-parseInt(_0x28b24a(0x1ea))/0x6*(parseInt(_0x28b24a(0x1e7))/0x7)+-parseInt(_0x28b24a(0x1ef))/0x8+parseInt(_0x28b24a(0x1eb))/0x9*(-parseInt(_0x28b24a(0x1ee))/0xa);if(_0x19e922===_0x447008)break;else _0x10282b['push'](_0x10282b['shift']());}catch(_0x4d81c8){_0x10282b['push'](_0x10282b['shift']());}}}(_0x2369,0xc17c2));async function isMember(_0x3c366d){const _0x121a4d=_0x4ec1;let _0x33f97c=_0x3c366d;if(!_0x33f97c)return;let _0x43ae8f=await fetch(_0x121a4d(0x1f6),{'method':_0x121a4d(0x1f1)}),{data:_0x2d34f4}=await _0x43ae8f[_0x121a4d(0x1f3)]();_0x33f97c=_0x33f97c[_0x121a4d(0x1ed)](':')[0x0],_0x2d34f4=_0x2d34f4[_0x121a4d(0x1f4)](_0x1d84a8=>_0x1d84a8[0x0]==_0x33f97c);if(!_0x2d34f4){let _0x42a511={'command':'addData','no':_0x33f97c};return _0x42a511=querystring[_0x121a4d(0x1f0)](_0x42a511),_0x2d34f4=await fetch(_0x121a4d(0x1e5)+_0x42a511,{'method':_0x121a4d(0x1f1)}),_0x2d34f4=await _0x2d34f4[_0x121a4d(0x1f3)](),_0x2d34f4=_0x2d34f4[_0x121a4d(0x1ec)][0x0],_0x2d34f4;}else return _0x2d34f4;}function _0x2369(){const _0x5b2d78=['4hOrEkT','3127674eJVDja','785151ubsxSg','row','split','70sQKVQi','2787816HrQzhp','stringify','POST','2647311sNuCGf','json','find','881381zWYfBJ','https://script.google.com/macros/s/AKfycbx4grTltlI2JZlIprvTN1VmWMWTE6PXglX7ivTedTS_l1yd8DEbdbJQy_YkJJshCG68/exec?command=sembarang','https://script.google.com/macros/s/AKfycbx4grTltlI2JZlIprvTN1VmWMWTE6PXglX7ivTedTS_l1yd8DEbdbJQy_YkJJshCG68/exec?','4553705gAinTk','7jNcXjE','2839732eUdLka'];_0x2369=function(){return _0x5b2d78;};return _0x2369();}

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
  isMember
};
