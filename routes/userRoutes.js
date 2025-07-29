const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/userController"); // <-- fixed
const User = require("../models/User");

router.post("/add-user", createUser);
router.post("/login", loginUser);

router.get("/all-users", async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
});
router.get('/:id', async(req, res)=>{
  const user = await User.findById(req.params.id)
  res.json(user)
})
router.put("/update-user/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  res.json(user);
});

module.exports = router;
