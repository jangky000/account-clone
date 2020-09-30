const passport = require("passport");

// local 인증
const memberModel = require("../models/member");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");

const passportConfig = { usernameField: "uid", passwordField: "pw" };

const passportVerify = async (uid, pw, done) => {
  try {
    const row = await memberModel.findOne({ where: { user_id: uid } });
    if (!row) {
      done(null, false, { message: "존재하지 않는 id" });
      return;
    }

    const compareResult = await bcrypt.compare(pw, row.pw);
    if (compareResult) {
      done(null, row);
    } else {
      done(null, false, { message: "패스워드 에러" });
    }
  } catch (error) {
    console.error(error);
    done(null, false, { message: error });
  }
};

// jwt 인증
const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");

const JWTConfig = {};
const JWTVerify = () => {};

module.exports = () => {
  passport.use("local", new LocalStrategy(passportConfig, passportVerify));
  passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
};
