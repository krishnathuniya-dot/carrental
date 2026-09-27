
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Booking = require("../models/booking");
const AddCar = require("../models/addcar");

// =========================================================
// CREATE BOOKING
// =========================================================

router.post("/booking", async (req, res) => {
  try {
    const {
      brand,
      from_date,
      to_date,
      message,
      name,
      userId,
      vehicleId,
    } = req.body;

    console.log("REQ BODY:", req.body);

    // Required fields
    if (
      !brand ||
      !from_date ||
      !to_date ||
      !message ||
      !name ||
      !userId ||
      !vehicleId
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // Check User ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Check Vehicle ID
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle ID",
      });
    }

    // Check vehicle exists
    const vehicle = await AddCar.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Create booking
    const bookingData = await Booking.create({
      brand,
      from_date,
      to_date,
      message,
      name,
      userId: new mongoose.Types.ObjectId(userId),
      vehicleId: new mongoose.Types.ObjectId(vehicleId),
    });

    res.status(201).json({
      success: true,
      message: "Booking successful",
      data: bookingData,
    });
  } catch (error) {
    console.error("Booking Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =========================================================
// MANAGE BOOKINGS - ADMIN
// =========================================================

router.get("/managebooking", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("vehicleId", "vehicleTitle brand image1 image2 image3 image4 image5")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Manage Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});


// =========================================================
// UPDATE BOOKING STATUS
// =========================================================

router.put("/bookingstatus/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "Not Confirmed yet",
      "Confirmed",
      "Cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: status,
      },
      {
        new: true,
      }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Booking Status Error:", error);

    res.status(500).json({
      success: false,
      message: "Error updating booking status",
    });
  }
});


// =========================================================
// CANCEL BOOKING
// =========================================================

router.put("/booking/cancel/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "Cancelled",
      },
      {
        new: true,
      }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking cancelled",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Cancel Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Error cancelling booking",
    });
  }
});


// =========================================================
// BOOKING COUNT
// =========================================================

router.get("/booking/count", async (req, res) => {
  try {
    const count = await Booking.countDocuments();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Booking Count Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =========================================================
// MY BOOKINGS
// =========================================================

router.get("/mybookings/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate User ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const bookings = await Booking.find({
      userId: userId,
    })
      .populate(
        "vehicleId",
        "vehicleTitle brand image1 image2 image3 image4 image5"
      )
      .sort({ createdAt: -1 });

    console.log("MY BOOKINGS:", bookings);

    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


module.exports = router;

