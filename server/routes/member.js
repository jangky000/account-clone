const express = require("express");
const router = express.Router();

const { jwtAuthReq } = require("../utils/auth");

const { registerCont } = require("../controller/registerCont");

// 회원가입
router.post("/", jwtAuthReq, registerCont);

// test
router.get("/", async function (req, res, next) {
  // const row = await memberModel.findAll();
  // const row = await memberModel.findOne({ where: { uid: "user1" } });
  // console.log(row.dataValues);
  // res.status(200).json(row);
});

module.exports = router;
