const bcrypt = require("../utils/bcrypt");
const memberModel = require("../models").member;

const registerCont = async (req, res, next) => {
  const { uid, pw, mname } = req.body;

  const memberData = {
    uid: uid,
    pw: await bcrypt.hashingPw(pw),
    mname: mname,
  };

  try {
    const result = await memberModel.create(memberData);
    res.status(201).json({ success: true, memno: result.dataValues.memno });
  } catch (error) {
    console.log(error);
    res.status(201).json({ success: false, message: "Can't create member" });
  }
};
