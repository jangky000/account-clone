const passport = require("passport");
const { createJWT } = require("../utils/jwt");

// 로컬 로그인 인증
exports.localAuthReq = (req, res, next) => {
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
    });
  })(req, res, next);
};
