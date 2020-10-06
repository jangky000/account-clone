const sequelize = require("../models").Sequelize;
const { dashDate, firstLastDay } = require("../utils/date");

const accountLogModel = require("../models").account_log;
const categoryModel = require("../models").category;

exports.statusCateExpenseCont = async (req, res, next) => {
  const { year, month } = req.params;
  const rows = await getIESumByCategoryThisMonth("E", year, month);
  const cateStatus = statusCateFormatting("E", rows);
  res.status(201).json({ success: true, cateStatus: cateStatus });
};

//controller
const getIESumByCategoryThisMonth = async (mode, year, month) => {
  const { firstDay, lastDay } = firstLastDay(year, month);
  return accountLogModel.findAll({
    attributes: [
      "cateno",
      [sequelize.fn("sum", sequelize.col("money")), "total_money"],
    ],
    where: {
      iemode: mode,
      rdate: {
        [sequelize.Op.between]: [dashDate(firstDay), dashDate(lastDay)],
      },
    },
    group: ["cateno"],
    include: [{ model: categoryModel, required: true }],
  });
};

// controller
const statusCateFormatting = (mode, rows) => {
  const cateStatus = {};
  rows.forEach((e) => {
    const row = e.dataValues;
    const cateno = row.cateno;
    const catename = row.category.dataValues.catename;
    const total_money =
      mode == "I" ? parseInt(row.total_money) : -parseInt(row.total_money);
    cateStatus[cateno] = {
      cateno: cateno,
      catename: catename,
      total_money: total_money,
    };
  });
  return cateStatus;
};

exports.statusDateExpenseCont = async (req, res, next) => {
  const year = req.params.year;
  const month = req.params.month;
  const rows = await getIESumByDayThisMonth("E", year, month);
  const dateStatus = statusDateFormatting("E", rows);
  res.status(201).json({ success: true, dateStatus: dateStatus });
};

exports.statusDateIncomeCont = async (req, res, next) => {
  const year = req.params.year;
  const month = req.params.month;
  const rows = await getIESumByDayThisMonth("I", year, month);
  const dateStatus = statusDateFormatting("I", rows);
  res.status(201).json({ success: true, dateStatus: dateStatus });
};

//controller
const getIESumByDayThisMonth = async (mode, year, month) => {
  const { firstDay, lastDay } = firstLastDay(year, month);
  return accountLogModel.findAll({
    attributes: [
      [sequelize.fn("Date", sequelize.col("rdate")), "date"],
      [sequelize.fn("sum", sequelize.col("money")), "total_money"],
    ],
    where: {
      iemode: mode,
      rdate: {
        [sequelize.Op.between]: [dashDate(firstDay), dashDate(lastDay)],
      },
    },
    group: [sequelize.fn("Date", sequelize.col("rdate"))],
  });
};

const statusDateFormatting = (mode, rows) => {
  const dateStatus = {};
  rows.forEach((e) => {
    const row = e.dataValues;
    const date = row.date;
    const total_money =
      mode == "I" ? parseInt(row.total_money) : -parseInt(row.total_money);
    dateStatus[date] = {
      date: date,
      total_money: total_money,
    };
  });
  return dateStatus;
};
