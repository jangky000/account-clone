const redis = require("redis");
require("dotenv").config();

const { RD_HOST, RD_PORT, RD_DB, RD_PASSWORD, RD_EXPIRE } = process.env;

const redisClient = redis.createClient({
  host: RD_HOST,
  port: RD_PORT,
  db: RD_DB,
  password: RD_PASSWORD,
});

exports.setRD = (token) => {
  redisClient.set(token, "token", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    redisClient.expire(token, RD_EXPIRE * 60); // 5분
    // console.log(result); // ok
  });
};

exports.getRD = (token) => {
  redisClient.get(token, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  });
};
