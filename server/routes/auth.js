const express = require("express");
const router = express.Router();

const { jwtAuthReq } = require("../middleware/auth");

const { localAuthReq } = require("../controller/loginCont");

// 로그인
router.post("/login", localAuthReq);

// 로그아웃
router.get("/logout", jwtAuthReq, function (req, res, next) {
  // res.clearCookie("token");
  // todo: redis 로그아웃된 토큰 추가
  res.status(200).json({ msg: "/api/auth/logout" });
});

module.exports = router;
