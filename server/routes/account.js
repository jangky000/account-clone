const express = require("express");
const router = express.Router();

const { jwtAuthReq } = require("../middleware/auth");

// 가계부 로그 조회
router.get("/", jwtAuthReq, async (req, res, next) => {
  res.status(200).json({ success: true });
});

// 가계부 로그 추가
router.post("/", jwtAuthReq, async (req, res, next) => {
  res.status(200).json({ success: true });
});

module.exports = router;
