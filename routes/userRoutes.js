const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/userController"); // <-- fixed
const User = require("../models/User");
const InternshipProgram = require("../models/InternshipProgram");


router.post("/add-user", createUser);
router.post("/login", loginUser);

router.get("/all-users", async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
});
router.get('/:id', async (req, res) => {
  try {
    // Find the user by ID and populate the assigned program if it exists
    const user = await User.findById(req.params.id)
      .populate({
        path: 'assignedProgram',   // field in User schema pointing to Program
        select: 'name duration startDate endDate', // fields you want to include
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.put("/update-user/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  res.json(user);
});

router.put("/:id/assign", async (req, res) => {
  const { programId } = req.body;
  try {
    const program = await InternshipProgram.findById(programId);
    if (!program) return res.status(404).json({ message: "Program not found" });

    const student = await User.findByIdAndUpdate(
      req.params.id,
      { status: "assigned", assignedProgram: programId }
    )

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student assigned successfully", student });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
