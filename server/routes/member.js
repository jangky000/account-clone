const express = require("express");
const router = express.Router();

const memberDB = require("../model/memberDB");

router.post("/", async function (req, res, next) {
  const { uid, pw, mname } = req.body;
  const insertId = await memberDB.create(uid, pw, mname);
  if (insertId) {
    res.status(200).json(insertId);
  } else {
    next({ status: 500, message: "Can't create member" });
  }
});

// test
router.get("/", async function (req, res, next) {
  const row = await memberDB.getPwByUid("user1");
  res.status(200).json(row);
});

module.exports = router;
