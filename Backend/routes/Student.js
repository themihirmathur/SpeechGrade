const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudentLevel,
  removeStudent,
} = require("../controllers/Student");

router.post("/createStudent/:id", createStudent);
router.get("/getStudents", getStudents);
router.get("/getStudentById/:studentId", getStudentById);
router.put("/updateStudentLevel", updateStudentLevel);
router.delete("/deleteStudent/:studentId", removeStudent);

module.exports = router;