const getLevel = require("../Constants/Levels");
const ClassRoom = require("../models/ClassRoom");
const PastData = require("../models/PastData");


const getStudentData = async (req,res) => {
    try {
        const {studentId} = req.params;
        const studentData = await PastData.findOne({studentId}).select('pastLevel');
        if(!studentData){return res.json({data:[]})}
        const data = studentData.pastLevel;
        res.status(200).json({success: true, data});
    } catch (error) {
        res.status(500).json({success: false, error: "Internal Server Error!"});

    }}

const getClassAvgMonthWise = async (req, res) => {
  try {
    const { classId } = req.params;
    const classData = await ClassRoom.findById(classId).select("StudentId");
    const { StudentId } = classData;
    const pastData = await PastData.find({ studentId: { $in: StudentId } });
    const Sum = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
    const freq = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
    pastData.forEach((data) => {
      data.pastLevel.forEach((levelData) => {
        const month = levelData.timeStamp.getMonth();
        Sum[month] += getLevel(levelData.level);
        freq[month]++;
      });
    });
    const avg = {};
    for (const month in Sum) {
      avg[month] = Sum[month] / freq[month];
    }
    res.status(200).json({ success: true, avg });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};
module.exports = { getStudentData, getClassAvgMonthWise };
