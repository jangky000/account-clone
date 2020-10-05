const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET, JWT_EXPIRE } = process.env;

exports.createJWT = (data) => {
  // default : HMAC SHA256
  // 유효 시간은 5분
  const token = jwt.sign(data, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};
