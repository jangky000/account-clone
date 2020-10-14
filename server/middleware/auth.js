const passport = require("passport");

// todo: redis에서 토큰 찾기

//jwt 인증
exports.jwtAuthReq = (req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (jwtErr, member, message) => {
      if (member) {
        res.locals.member = member;
        next();
      } else {
        // console.log(jwtErr);
        // console.log(message);
        res
          .status(201)
          .json({ success: false, error: jwtErr, message: message.message });
      }
    }
  )(req, res, next);
};
