const express = require("express");
const router = express.Router();

const { jwtAuthReq } = require("../middleware/auth");

const { registerCont } = require("../controller/registerCont");

// 회원가입
router.post("/", jwtAuthReq, registerCont);

module.exports = router;
