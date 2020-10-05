const passport = require("passport");

//jwt 인증
exports.jwtAuthReq = (req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (jwtErr, member, message) => {
      if (member) {
        next();
      } else {
        console.log(jwtErr);
        console.log(message);
        res
          .status(201)
          .json({ success: false, error: jwtErr, message: message });
      }
    }
  )(req, res, next);
};
