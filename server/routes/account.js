const express = require("express");
const router = express.Router();

const { jwtAuthReq } = require("../middleware/auth");

const { getAccountLogsCont } = require("../controller/accountLogsCont");

// 가계부 로그 내역을 정리해서 리턴
router.get("/:year/:month", getAccountLogsCont);

// 가계부 로그 추가
router.post("/", jwtAuthReq, async (req, res, next) => {
  res.status(200).json({ success: true });
});

// 가계부 로그 수정
router.put("/", jwtAuthReq, async (req, res, next) => {
  res.status(200).json({ success: true });
});

// 가계부 로그 삭제
router.delete("/", jwtAuthReq, async (req, res, next) => {
  res.status(200).json({ success: true });
});

module.exports = router;
