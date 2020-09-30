const express = require("express");
const router = express.Router();

const memberModel = require("../models").member;

router.post("/", async function (req, res, next) {
  const memberData = req.body;
  try {
    const result = await memberModel.create(memberData);
    res.status(200).json({ success: true, memno: result.dataValues.memno });
  } catch (error) {
    next({ message: "Can't create member" });
  }
});

// test
router.get("/", async function (req, res, next) {
  // const row = await memberModel.findAll();
  // const row = await memberModel.findOne({ where: { uid: "user1" } });
  // console.log(row.dataValues);
  // res.status(200).json(row);
});

module.exports = router;
