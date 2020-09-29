var express = require("express");
var router = express.Router();

router.post("/login", function (req, res, next) {
  res.status(200).json({ msg: "/api/auth/login" });
});

router.get("/logout", function (req, res, next) {
  res.status(200).json({ msg: "/api/auth/logout" });
});

module.exports = router;
