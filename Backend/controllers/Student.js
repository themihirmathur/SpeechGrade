const logger = require("../logger/Logger");
const ClassRoom = require("../models/ClassRoom");
const PastData = require("../models/PastData");
const Student = require("../models/Student");

const createStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, rollNumber } = req.body;
    if (!name || !rollNumber) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide all details" });
    }
    const alreadyExists = await Student.findOne({ rollNumber });
    if (alreadyExists) {
      return res.json({ success: false, error: "Student already exists" });
    }
    const student = await Student.create({ name, rollNumber });
    await ClassRoom.findByIdAndUpdate(
      id,
      {
        $push: { StudentId: student._id },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Student created successfully" });
  } catch (error) {
    logger.error("Error creating student: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ rollNumber: 1 });
    res.status(200).json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide studentId" });
    }
    const studentDetails = await Student.findById(studentId);
    res.status(200).json({ success: true, studentDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

const removeStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide studentId" });
    }
    await Student.findByIdAndDelete(studentId);
    res
      .status(200)
      .json({ success: true, message: "Student removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

const updateStudentLevel = async (req, res) => {
  try {
    const { studentId, level } = req.body;
    if (!studentId || !level) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide studentId and level" });
    }
    await Student.findByIdAndUpdate(
      studentId,
      { $set: { level } },
      { new: true }
    );
    await PastData.findOneAndUpdate({studentId}, {
      $push: { pastLevel: {level,timeStamp: new Date()} },

    }, { new: true });
    res
      .status(200)
      .json({ success: true, message: "Student level updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};


module.exports = {
  createStudent,
  getStudentById,
  getStudents,
  removeStudent,
  updateStudentLevel,
};
