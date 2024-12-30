const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClassRoom = new Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    StudentId: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClassRoom", ClassRoom);
