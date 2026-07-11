const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");


router.post("/profiledata", async (req, res) => {
  try {
    const { name, email, contact, dob,city,country, Address } = req.body;

   
    if (!name || !email || !contact) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const profile = await Profile.findOneAndUpdate(
      { email: email }, 
      {
        name,
        email,
        contact,
        dob,
        Address,
        city,
        country,
    
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: "Profile saved successfully",
      data: profile,
       
    });

  } catch (error) {
    res.status(500).json({
      
      message: error.message,
    });
  }
});
router.get("/registerdata", async (req, res) => {
  try {
    const users = await Profile.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});
router.get("/registerdata/count", async (req, res) => {
  try {
    const count = await Profile.countDocuments();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;