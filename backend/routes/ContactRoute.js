const express = require("express");
const router = express.Router();
const Contact = require("../models/contactt");

router.post("/contactdata", async (req, res) => {
  try {
    const { name, email, contact, Massage } = req.body;
  

    // Validation
    if (!name || !email || !contact || !Massage) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const savedContact = await Contact.findOneAndUpdate(
      { email: email },
      {
        name,
        email,
        contact,
       Massage,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: "Data saved successfully",
      data: savedContact,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



router.get("/contactt", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

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
router.get("/contact/count", async (req, res) => {
  try {
    const count = await Contact.countDocuments();

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
module.exports = router;