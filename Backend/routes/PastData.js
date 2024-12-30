const express = require("express");
const router = express.Router();

const {
  getStudentData,
  getClassAvgMonthWise,
} = require("../controllers/pastData");

router.get("/getPastData/:id", getStudentData);
router.get("/getClassAvgMonthWise/:id", getClassAvgMonthWise);

module.exports = router;
