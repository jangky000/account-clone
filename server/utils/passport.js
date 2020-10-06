const passport = require("passport");
const memberModel = require("../models").member;

// local 인증
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");

const passportConfig = { usernameField: "uid", passwordField: "pw" };

const passportVerify = async (uid, pw, done) => {
  try {
    const row = await memberModel.findOne({ where: { uid: uid } });
    if (!row) {
      done(null, false, { message: "존재하지 않는 id" });
      return;
    }

    const compareResult = await bcrypt.compare(pw, row.pw);
    if (compareResult) {
      done(null, row, { message: "조회 성공" });
    } else {
      done(null, false, { message: "패스워드 에러" });
    }
  } catch (error) {
    console.error(error);
    done(error, false, { message: error });
  }
};

// jwt 인증
require("dotenv").config();
const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    const row = await memberModel.findOne({ where: { uid: jwtPayload.uid } });
    console.log(row);
    if (row) {
      done(null, row, { message: "jwt 인증 성공" });
    } else {
      done(null, false, { message: "jwt 인증 실패" });
    }
  } catch (error) {
    console.error(error);
    done(error, false, { message: "jwt 예외 발생" });
  }
};

module.exports = () => {
  passport.use("local", new LocalStrategy(passportConfig, passportVerify));
  passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
};
