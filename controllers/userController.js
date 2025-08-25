const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ✅ import jwt


const JWT_SECRET = "your_secret_key"; // ✅ define secret key (use env in production)

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = new User({
      name,
      email,
      phone,
      password,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    if(user.password == password){
      res.json({
      user: user,
    });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
