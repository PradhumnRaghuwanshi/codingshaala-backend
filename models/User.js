const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  password: { type: String },

  assignedProgram: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InternshipProgram",
  },
  status: {
    type: String,
    enum: ["enrolled", "assigned", "completed"],
    default: "enrolled",
  },
  classesCompleted: { type: Number, default: 0 },


  // Payment Info
  orderId : String,
  isPaid: { type: Boolean, default: false },
  paymentId: { type: String }, // Razorpay/Instamojo txn ID
  paymentDate: { type: Date },

  // Internship Tracking
  courseName: { type: String, default: "MERN Internship" }, // or JS/Python
  startDate: { type: Date },
  classesAttended: { type: Number, default: 0 },
  totalClasses: { type: Number, default: 30 },

  // Final Project
  projectLink: { type: String },
  projectRemarks: { type: String },

  // Certificate
  certIssued: { type: Boolean, default: false },
  certUrl: { type: String },

  // Admin Utilities
  role: { type: String, enum: ["student", "admin"], default: "student" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
