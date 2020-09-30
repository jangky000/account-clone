const express = require("express");
const router = express.Router();

const bcrypt = require("../utils/bcrypt");
const memberModel = require("../models").member;

router.post("/", async function (req, res, next) {
  const { uid, pw, mname } = req.body;

  const memberData = {
    uid: uid,
    pw: await bcrypt.hashingPw(pw),
    mname: mname,
  };

  try {
    const result = await memberModel.create(memberData);
    res.status(200).json({ success: true, memno: result.dataValues.memno });
  } catch (error) {
    console.log(error);
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
