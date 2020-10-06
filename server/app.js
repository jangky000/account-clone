const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const passport = require("passport");
const passportConfig = require("./utils/passport");

const authRouter = require("./routes/auth");
const memberRouter = require("./routes/member");
const accountRouter = require("./routes/account");
const statusRouter = require("./routes/status");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
passportConfig();

app.use("/api/auth", authRouter);
app.use("/api/member", memberRouter);
app.use("/api/account", accountRouter);
app.use("/api/status", statusRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500).json({ success: false, message: err.message });
});

module.exports = app;
