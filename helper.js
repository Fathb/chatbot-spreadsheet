let {
  ss
} = require("./spreadsheet");
module.exports = {
  getUserByHp: async (noHP) => {
    let user = await ss.getRows("users!a2:c");
    let duplikat;
    if (user) {
      await user.forEach(usr=> {
        if (usr[0] == noHP) {
          duplikat = [usr[1],
            noHP];
        } else {
          duplikat = null;
        }
      });
    }
    return duplikat;
  }
}