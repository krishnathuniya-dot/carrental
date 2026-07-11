const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Info = require("../models/info");
const info = require("../models/info");


router.post("/contactinfo", async (req, res) => {
  try {
    const { email, contact, address } = req.body;

   
    if (!email || !contact || !address) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

   
    const contactInfo = await Info.findOneAndUpdate(
      {}, 
      {
        email,
        contact,
        address,
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );

    res.status(200).json({
      message: "Contact info saved successfully",
      data: contactInfo,
      createdAt: contactInfo.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/contactinfo", async (req, res) => {
  try {
    // agar fixed user ka data fetch karna hai to id use karo
    // const user = await User.findById("69c2535ad55180943d191e57").select("address email contact");

    // फिलहाल first user fetch karega
    const user = await info.findOne().select("address email contact");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Contact info not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact info fetched successfully",
      data: {
        address: user.address || "",
        email: user.email || "",
        contact: user.contact || "",
      },
    });
  } catch (error) {
    console.error("GET CONTACT INFO ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
});

// ===============================
// UPDATE CONTACT INFO (without login)
// ===============================
router.put("/contactinfo", async (req, res) => {
  try {
    const { address, email, contact } = req.body;

    // agar fixed user ka data update karna hai to id use karo
    // const user = await User.findById("69c2535ad55180943d191e57");

    // फिलहाल first user update karega
    const user = await info.findOne();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Contact info not found",
      });
    }

    user.address = address || "";
    user.email = email || "";
    user.contact = contact || "";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Contact info updated successfully",
      data: {
        address: user.address,
        email: user.email,
        contact: user.contact,
      },
    });
  } catch (error) {
    console.error("UPDATE CONTACT INFO ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
});

module.exports = router;