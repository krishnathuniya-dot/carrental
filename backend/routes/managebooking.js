const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Booking = require("../models/booking");
const booking = require("../models/booking");

router.post("/booking", async (req, res) => {
  try {
    const { brand, from_date, to_date, message, name, userId } = req.body;

    console.log("REQ BODY:", req.body);

    if (!brand || !from_date || !to_date || !message || !name || !userId) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const bookingData = await Booking.create({
      brand,
      from_date,
      to_date,
      message,
      name,
      userId:new mongoose.Types.ObjectId(userId),
    });

    res.status(201).json({
      message: "Booking successful",
      data: bookingData,
      
    });

  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
}); 

router.get("/managebooking", async (req, res) => {
  try {
    const brandes = await booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: booking.length,
      data: brandes,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});
router.put("/bookingstatus/:id", async (req, res) => {
  try {
    
   
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
     
       { status: status },
      { new: true }
    );

    res.json({ message: "Booking confirmed",id:booking._id,booking});
  } catch (error) {
    res.status(500).json({ message: "Error confirming booking" });
  }
});
router.put("/booking/cancel/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking" });
  }
});
router.get("/booking/count", async (req, res) => {
  try {
    const count = await Booking.countDocuments();

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
router.get("/mybookings/:userId", async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const bookings = await Booking.find({
      userId: userId,
    })
    console.log(bookings)

    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });

  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
module.exports = router;