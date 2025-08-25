const mongoose = require("mongoose");

const InternshipProgramSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      required: true, // in days
    },
    totalClasses: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    classTime: {
      type: String, // e.g. "17:00-18:30"
    },
    doubtSessionTime: {
      type: String,
    },
    maxStudents: {
      type: Number,
      default: 10,
    },
    status: {
      type: String,
      enum: ["active", "upcoming", "completed"],
      default: "upcoming",
    },
    technologies: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InternshipProgram", InternshipProgramSchema);
