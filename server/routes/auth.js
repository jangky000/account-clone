const express = require("express");
const router = express.Router();

const passport = require("passport");
const { createJWT } = require("../utils/jwt");

const localAuthReq = (req, res, next) => {
  passport.authenticate("local", (passportErr, member, message) => {
    if (passportErr || !member) {
      res.status(400).json({ success: false, ...message });
      return;
    }

    // req.login()를 passport에서 처리하여 결과를 req.user에 저장
    req.login(member.dataValues, { session: false }, (loginError) => {
      if (loginError) {
        res.status(400).json({ success: false, message: loginError });
        return;
      }

      res.status(200).json({
        success: true,
        token: createJWT({
          uid: member.dataValues.uid,
          mname: member.dataValues.mname,
        }),
      });

      // next();
    });
  })(req, res, next);
};

router.get("/logintest", localAuthReq, function (req, res, next) {
  console.log(req.user); // req.login() 결과
  return res.status(200).json({ test: "logintest" });
});

const jwtAuthReq = (req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (jwtErr, member, message) => {
      console.log(jwtErr);
      console.log(member);
      console.log(message);
      res.status(200).json(member);
    }
  )(req, res, next);
};

router.get("/authtest", jwtAuthReq, function (req, res, next) {
  console.log(req.user); // req.login() 결과
  return res.status(200).json({ test: "authtest" });
});

router.post("/login", function (req, res, next) {
  res.status(200).json({ msg: "/api/auth/login" });
});

router.get("/logout", function (req, res, next) {
  res.status(200).json({ msg: "/api/auth/logout" });
});

module.exports = router;
