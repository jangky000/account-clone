const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.createJWT = (data) => {
  // default : HMAC SHA256
  // 유효 시간은 5분
  const token = jwt.sign(data, JWT_SECRET, {
    expiresIn: "5m",
  });
  return token;
};
