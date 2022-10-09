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

function _0x2ff3(_0xffede3,_0xefeca8){const _0x15d7e6=_0x15d7();return _0x2ff3=function(_0x2ff36b,_0x1214cf){_0x2ff36b=_0x2ff36b-0xb4;let _0x2564de=_0x15d7e6[_0x2ff36b];return _0x2564de;},_0x2ff3(_0xffede3,_0xefeca8);}function _0x15d7(){const _0xcef42b=['row','stringify','1014106lsVfyp','17013524kwfxaI','35860KcWhWr','28023tvWlkq','5hRbmLd','36AQhIWT','2589996Khrqkf','find','https://script.google.com/macros/s/AKfycbx4grTltlI2JZlIprvTN1VmWMWTE6PXglX7ivTedTS_l1yd8DEbdbJQy_YkJJshCG68/exec?','json','930480XKVGyW','substring','https://script.google.com/macros/s/AKfycbx4grTltlI2JZlIprvTN1VmWMWTE6PXglX7ivTedTS_l1yd8DEbdbJQy_YkJJshCG68/exec?command=sembarang','addData','6717272KLwZIf','POST','124SJQmKg','2655isigzQ','7szMpsy'];_0x15d7=function(){return _0xcef42b;};return _0x15d7();}(function(_0x1b1a88,_0xfb5937){const _0x25557b=_0x2ff3,_0x5ce500=_0x1b1a88();while(!![]){try{const _0x5838b0=-parseInt(_0x25557b(0xbc))/0x1+-parseInt(_0x25557b(0xb7))/0x2*(parseInt(_0x25557b(0xbf))/0x3)+parseInt(_0x25557b(0xc2))/0x4*(-parseInt(_0x25557b(0xc0))/0x5)+parseInt(_0x25557b(0xc6))/0x6+-parseInt(_0x25557b(0xb9))/0x7*(parseInt(_0x25557b(0xb5))/0x8)+-parseInt(_0x25557b(0xb8))/0x9*(parseInt(_0x25557b(0xbe))/0xa)+parseInt(_0x25557b(0xbd))/0xb*(parseInt(_0x25557b(0xc1))/0xc);if(_0x5838b0===_0xfb5937)break;else _0x5ce500['push'](_0x5ce500['shift']());}catch(_0x22042e){_0x5ce500['push'](_0x5ce500['shift']());}}}(_0x15d7,0xa05d8));async function isMember(_0x2e7406){const _0x1f3cea=_0x2ff3;let _0x6bc541=_0x2e7406;if(!_0x6bc541)return;let _0x1322aa=await fetch(_0x1f3cea(0xc8),{'method':_0x1f3cea(0xb6)}),{data:_0x4912da}=await _0x1322aa[_0x1f3cea(0xc5)]();_0x6bc541=_0x6bc541[_0x1f3cea(0xc7)](0x0,0xd),_0x4912da=_0x4912da[_0x1f3cea(0xc3)](_0x2bb1d0=>_0x2bb1d0[0x0]==_0x6bc541);if(!_0x4912da){let _0x368449={'command':_0x1f3cea(0xb4),'no':_0x6bc541};return _0x368449=querystring[_0x1f3cea(0xbb)](_0x368449),_0x4912da=await fetch(_0x1f3cea(0xc4)+_0x368449,{'method':_0x1f3cea(0xb6)}),_0x4912da=await _0x4912da[_0x1f3cea(0xc5)](),_0x4912da=_0x4912da[_0x1f3cea(0xba)][0x0],_0x4912da;}else return _0x4912da;}

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
