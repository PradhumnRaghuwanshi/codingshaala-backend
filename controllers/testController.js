const TestResult = require("../models/TestResult");
const User = require("../models/User");

exports.submitTest = async (req, res) => {
  try {
    const { userId, score, totalQuestions } = req.body;

    if (!userId || score === undefined || !totalQuestions) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Save test result
    const test = new TestResult({ userId, score, totalQuestions });
    await test.save();

    // Update user
    const status = score >= 6 ? "test_passed" : "test_failed";

    await User.findByIdAndUpdate(userId, {
      testScore: score,
      status,
    });

    res.status(200).json({
      message: "Test submitted successfully",
      passed: score >= 6,
      score,
    });
  } catch (err) {
    console.error("Test submission error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
