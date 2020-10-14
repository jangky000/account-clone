const Op = require("../models").Sequelize.Op;

const accountLogModel = require("../models").account_log;
const categoryModel = require("../models").category;
const payMethodModel = require("../models").pay_method;

const { dashDate, firstLastDay } = require("../utils/date");

/*
응답 형식:
{
  success: true,
  logs: logs
}

// logs 형식
{
  2020-10-05: {
    date: 2020-10-05,
    dayname: 월,
    tot_income: 0,
    tot_expense: 0,
    contents: [
      {
        iemode: ,
        cateno: ,
        catename: ,
        memo: ,
        payno: ,
        payname: ,
        money: ,
      },
      ...
    ],
  },
  ...
}
*/

exports.getAccountLogsCont = async (req, res, next) => {
  const year = req.params.year;
  const month = req.params.month;
  const { firstDay, lastDay } = firstLastDay(year, month);
  const list = await getAccountLogByDate(res.locals.member, firstDay, lastDay);
  const logs = accountLogFormatting(list);
  res.status(200).json({ success: true, logs: logs });
};

// 최신순으로 내역 데이터 읽어오기
const getAccountLogByDate = async (member, firstDay, lastDay) => {
  return accountLogModel.findAll({
    where: {
      memno: member.memno,
      rdate: { [Op.between]: [dashDate(firstDay), dashDate(lastDay)] },
    },
    order: [["rdate", "DESC"]],
    include: [
      { model: categoryModel, required: true },
      { model: payMethodModel, required: true },
    ],
  });
};

const ifHasNoDateInObjThenInit = (logObj, date, rdate) => {
  const dayNameList = ["일", "월", "화", "수", "목", "금", "토"];
  if (!Object.keys(logObj).includes(date)) {
    logObj[date] = {};
    logObj[date].date = date; // 2020-10-06
    logObj[date].dayname = dayNameList[rdate.getDay()]; // 화
    logObj[date].tot_income = 0;
    logObj[date].tot_expense = 0;
    logObj[date].contents = [];
  }
};

// income, expense에 따라 합산
const addTotIE = (logSubObj, row) => {
  if (row.iemode == "I") {
    logSubObj.tot_income += parseInt(row.money);
  } else {
    logSubObj.tot_expense += -parseInt(row.money);
  }
};

// contents 추가
const addContent = (logSubObj, row) => {
  const content = {
    iemode: row.iemode,
    cateno: row.cateno,
    catename: row.category.dataValues.catename,
    memo: row.memo,
    payno: row.payno,
    payname: row.pay_method.dataValues.payname,
    money: row.money,
  };
  logSubObj.contents.push(content);
};

// 내역 형식에 맞춰 정리
const accountLogFormatting = (list) => {
  const logObj = {};
  list.forEach((e) => {
    const row = e.dataValues;
    const rdate = new Date(row.rdate);
    const date = dashDate(rdate);

    ifHasNoDateInObjThenInit(logObj, date, rdate);
    addTotIE(logObj[date], row);
    addContent(logObj[date], row);
  });
  return logObj;
};
