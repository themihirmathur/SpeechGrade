const ClassRoom = require("../models/ClassRoom");
const Student = require("../models/Student");

const createClassRoom = async (req, res) => {
  try {
    const { name } = req.body;
    await ClassRoom.create({ name });
    res
      .status(201)
      .json({ success: true, message: "ClassRoom created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};
const getClassRooms = async (req, res) => {
  try {
    const classes = await ClassRoom.find();
    res.status(200).json({ success: true, classes });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

const getClassRoomById = async (req, res) => {
  try {
    const { classId } = req.params;
    const classDetails = await ClassRoom.findById(classId);
    res.status(200).json({ success: true, classDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

const addStudentToClassRoom = async (req, res) => {
  try {
    const { classId, studentId } = req.body;
    await ClassRoom.findByIdAndUpdate(classId, {
      $push: { StudentId: studentId },
    });
    res
      .status(200)
      .json({ success: true, message: "Student added to class successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

const deleteStudentFromClassRoom = async (req, res) => {
  try {
    const { classId, studentId } = req.body;
    await ClassRoom.findByIdAndUpdate(classId, {
      $pull: { StudentId: studentId },
    });
    res.status(200).json({
      success: true,
      message: "Student removed from class successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

const getStudentsInClassRoom = async (req, res) => {
  try {
    const { classId } = req.params;
    const classDetails = await ClassRoom.findById(classId);
    const Students = await Student.find({ _id: { $in: classDetails.StudentId } });
    res.status(200).json({ success: true,Students});
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }

}


const classRoomLevelFreq = async (req,res) => {
    try {
      const {classId} = req.params;
      const classRoom = await ClassRoom.findById(classId);
      const students = await Student.find({_id: {$in: classRoom.StudentId}});
      const levelFreq = {};
      students.forEach(student => {
        if(levelFreq[student.level]){
          levelFreq[student.level] += 1;
        } else {
          levelFreq[student.level] = 1;
        }
      });
      res.status(200).json({success: true, levelFreq});
    } catch (error) {
      res.status(500).json({success: false, error: "Internal Server Error!"});
    }
}

module.exports = {
  addStudentToClassRoom,
  createClassRoom,
  classRoomLevelFreq,
  getClassRooms,
  deleteStudentFromClassRoom,
  getClassRoomById,
  getStudentsInClassRoom,
}
