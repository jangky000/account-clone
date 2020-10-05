const express = require("express");
const router = express.Router();

const { jwtAuthReq } = require("../utils/auth");

const { localAuthReq } = require("../controller/loginCont");

router.post("/login", localAuthReq);
router.get("/logout", jwtAuthReq, function (req, res, next) {
  // 쿠키 삭제
  // 발급한 토큰 삭제
  res.status(200).json({ msg: "/api/auth/logout" });
});

module.exports = router;
