const express = require("express");
const router = express.Router();
// const {
//     teacherAuth
// } = require('../middlewares/teacherAuth')
const {loginTeacher} = require("../controllers/Teacher");

router.post("/login", loginTeacher);

module.exports = router;
