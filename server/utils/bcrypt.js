const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hashingPw = (pw) => bcrypt.hash(pw, saltRounds);
exports.comparePw = (pw, hashedPw) => bcrypt.compare(pw, hashedPw);
