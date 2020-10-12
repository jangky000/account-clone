const express = require("express");
const router = express.Router();

const { jwtAuthReq } = require("../middleware/auth");
const { getAccountLogsCont } = require("../controller/accountLogsCont");

const accountLogModel = require("../models").account_log;

// 가계부 로그 내역을 정리해서 리턴
router.get("/:year/:month", getAccountLogsCont);

// 가계부 로그 추가
router.post("/", jwtAuthReq, async (req, res, next) => {
  const memno = "1";
  const { iemode, cateno, payno, money, memo, rdate } = req.body;
  const accountData = {
    iemode: iemode,
    memno: memno,
    cateno: cateno,
    payno: payno,
    money: money,
    memo: memo,
    rdate: rdate,
  };
  const result = await accountLogModel.create(accountData);
  res.status(201).json({ success: true, logno: result.dataValues.logno });
});

// 가계부 로그 수정
router.put("/:logno", jwtAuthReq, async (req, res, next) => {
  const logno = req.params.logno;
  const memno = "1";
  const { iemode, cateno, payno, money, memo, rdate } = req.body;
  const accountData = {
    iemode: iemode,
    memno: memno,
    cateno: cateno,
    payno: payno,
    money: money,
    memo: memo,
    rdate: rdate,
  };
  const where = { where: { logno: logno } };
  const result = await accountLogModel.update(accountData, where);
  res.status(201).json({ success: true, result: result });
});

// 가계부 로그 삭제
router.delete("/:logno", jwtAuthReq, async (req, res, next) => {
  const logno = req.params.logno;
  const result = await accountLogModel.destroy({ where: { logno: logno } });
  res.status(201).json({ success: true, result: result });
});

module.exports = router;
