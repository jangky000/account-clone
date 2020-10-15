const express = require("express");
const router = express.Router();

const { jwtAuthReq } = require("../middleware/auth");

const { localAuthReq } = require("../controller/loginCont");

// 로그인
router.post("/login", localAuthReq);

// 로그아웃
router.get("/logout", jwtAuthReq, function (req, res, next) {
  console.log(`${res.locals.member.uid} 로그아웃`);
  // todo: redis 로그아웃된 토큰 추가
  res
    .status(200)
    .json({ success: true, message: `${res.locals.member.uid} 로그아웃` });
});

module.exports = router;
