const express = require("express");
const router = express.Router();

const { jwtAuthReq } = require("../middleware/auth");
const { getAccountLogsCont } = require("../controller/accountLogsCont");

const accountLogModel = require("../models").account_log;
const categoryModel = require("../models").category;
const payMethodModel = require("../models").pay_method;

const Op = require("../models").Sequelize.Op;

router.get("/select", jwtAuthReq, async (req, res, next) => {
  let cateList = await categoryModel.findAll();
  cateList = cateList.reduce((arr, cate) => {
    arr.push(cate.dataValues);
    return arr;
  }, []);

  let payList = await payMethodModel.findAll({
    where: {
      [Op.or]: [
        { memno: res.locals.member.memno },
        { memno: { [Op.eq]: null } },
      ],
    },
  });
  payList = payList.reduce((arr, pay) => {
    arr.push(pay.dataValues);
    return arr;
  }, []);

  return res.status(200).json({
    success: true,
    select: { cateList: cateList, payList: payList },
  });
});
// 가계부 로그 내역을 정리해서 리턴
router.get("/:year/:month", jwtAuthReq, getAccountLogsCont);

// 가계부 로그 추가
router.post("/", jwtAuthReq, async (req, res, next) => {
  const memno = res.locals.member.memno;
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
  const memno = res.locals.member.memno;
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
