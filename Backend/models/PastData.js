const mongoose = require("mongoose");
const { Schema } = mongoose;

const PastData = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    pastLevels: {
      type: Array,
      default: "No Record",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PastData", PastData);
