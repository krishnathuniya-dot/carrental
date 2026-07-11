const express = require("express");
const router = express.Router();
const Contact = require("../models/subscriber");
const subscriber = require("../models/subscriber");

router.post("/subscribedata", async (req, res) => {
  try {
    const {  email } = req.body;
  

    // Validation
    if ( !email  ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const savedsubscribe = await subscriber.findOneAndUpdate(
      { email: email },
      {
      
        email,
      
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: "subscribe successfully",
      data: savedsubscribe,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



router.get("/subscribe", async (req, res) => {
  try {
    const contacts = await subscriber.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: contacts.length,
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});
router.get("/subscribe/count", async (req, res) => {
  try {
    const count = await subscriber.countDocuments();

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
