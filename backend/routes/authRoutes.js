const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "miC4u9H5HbCyvH03HC+p1OJuYN48Ue/He01Rd2LyLbM";

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  const { name, email, password, contact } = req.body;

  try {
    if (!name || !email || !password || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      contact,
      dob: "",
      address: "",
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        _id: newUser._id,   // ✅ FIXED
        name: newUser.name,
        email: newUser.email,
        contact: newUser.contact,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,   // ✅ FIXED
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        
        _id: user._id,   // ✅ FIXED
        name: user.name,
        email: user.email,
        contact: user.contact,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ================= GET PROFILE =================
router.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Requested ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,   // ✅ FIXED
        name: user.name,
        email: user.email,
        contact: user.contact,
        dob: user.dob || "",
        address: user.address || "",
        createdAt: user.createdAt || "",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// ================= UPDATE PROFILE =================
router.put("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contact, dob, address } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, contact, dob, address },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,   // ✅ FIXED
        name: updatedUser.name,
        email: updatedUser.email,
        contact: updatedUser.contact,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// ================= CHANGE PASSWORD =================
router.post("/changepassword", async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res.status(400).json({
        message: "New password cannot be same as old",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;