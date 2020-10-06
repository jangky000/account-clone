const express = require("express");
const router = express.Router();

const { jwtAuthReq } = require("../middleware/auth");

const {
  statusCateExpenseCont,
  statusDateExpenseCont,
  statusDateIncomeCont,
} = require("../controller/status");

// 카테고리별 지출 통계
router.get("/category/expense/:year/:month", jwtAuthReq, statusCateExpenseCont);
// 일별 지출 통계
router.get("/date/expense/:year/:month", jwtAuthReq, statusDateExpenseCont);
// 일별 수입 통계
router.get("/date/income/:year/:month", jwtAuthReq, statusDateIncomeCont);

module.exports = router;
