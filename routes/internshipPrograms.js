const express = require("express");
const InternshipProgram = require("../models/InternshipProgram");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const program = new InternshipProgram(req.body);
    await program.save();
    res.status(201).json(program);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const programs = await InternshipProgram.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const program = await InternshipProgram.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json(program);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const program = await InternshipProgram.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json(program);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const program = await InternshipProgram.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json({ message: "Program deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id/update-classes', async (req, res) => {
  const { completedClass } = req.body;
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      { completedClass },
    );
    res.json(program);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update classes" });
  }
});

module.exports = router;
