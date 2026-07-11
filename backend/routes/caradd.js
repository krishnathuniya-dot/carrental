const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AddCar = require("../models/addcar");
const upload = require("../middleware/multer"); // ✅ import multer middleware


router.post(
  "/addvehicle",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("FILES:", req.files);
      console.log("BODY:", req.body);

      const {
        vehicleTitle,
        brand,
        vehicleOverview,
        pricePerDay,
        fuelType,
        modelYear,
        seatingCapacity,
        accessories,
      } = req.body;

      const newCar = new AddCar({
        vehicleTitle,
        brand,
        vehicleOverview,
        pricePerDay,
        fuelType,
        modelYear,
        seatingCapacity,
        accessories: accessories
          ? Array.isArray(accessories)
            ? accessories
            : [accessories]
          : [],
        image1: req.files?.image1?.[0]?.filename || "",
        image2: req.files?.image2?.[0]?.filename || "",
        image3: req.files?.image3?.[0]?.filename || "",
        image4: req.files?.image4?.[0]?.filename || "",
        image5: req.files?.image5?.[0]?.filename || "",
      });

      await newCar.save();

      res.status(201).json({
        success: true,
        message: "Vehicle added successfully",
        data: newCar,
      });
    } catch (error) {
      console.error("Add Vehicle Error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while adding vehicle",
        error: error.message,
      });
    }
  }
);


router.get("/addcardata", async (req, res) => {
  try {
    const cars = await AddCar.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: cars.length,
      data: cars,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// ==============================
// GET - Fetch vehicle by ID
// ==============================
router.get("/vehiclefetch/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await AddCar.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error("Fetch vehicle error:", error);
    res.status(500).json({ message: "Error fetching vehicle" });
  }
});

// ==============================
// GET - Vehicle count
// ==============================
router.get("/addcardata/count", async (req, res) => {
  try {
    const count = await AddCar.countDocuments();

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

// ==============================
// GET - Single car for edit page
// ==============================
router.get("/caradd/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    const car = await AddCar.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        id: car._id,
        vehicleTitle: car.vehicleTitle || "",
        brand: car.brand || "",
        modelYear: car.modelYear || "",
        vehicleOverview: car.vehicleOverview || "",
        pricePerDay: car.pricePerDay || "",
        fuelType: car.fuelType || "",
        accessories: car.accessories || [],
        seatingCapacity: car.seatingCapacity || "",
        image1: car.image1 || "",
        image2: car.image2 || "",
        image3: car.image3 || "",
        image4: car.image4 || "",
        image5: car.image5 || "",
        createdAt: car.createdAt || "",
      },
    });
  } catch (error) {
    console.error("GET VEHICLE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// PUT - Update vehicle
// ==============================
router.put(
  "/carupdate/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid vehicle ID" });
      }

      const existingCar = await AddCar.findById(id);

      if (!existingCar) {
        return res.status(404).json({ message: "Vehicle not found" });
      }

      const {
        vehicleTitle,
        brand,
        vehicleOverview,
        pricePerDay,
        fuelType,
        modelYear,
        seatingCapacity,
        accessories,
      } = req.body;

      const updatedAccessories = accessories
        ? Array.isArray(accessories)
          ? accessories
          : [accessories]
        : existingCar.accessories;

      const updatedData = {
        vehicleTitle,
        brand,
        vehicleOverview,
        pricePerDay,
        fuelType,
        modelYear,
        seatingCapacity,
        accessories: updatedAccessories,
        image1: req.files?.image1?.[0]?.filename || existingCar.image1,
        image2: req.files?.image2?.[0]?.filename || existingCar.image2,
        image3: req.files?.image3?.[0]?.filename || existingCar.image3,
        image4: req.files?.image4?.[0]?.filename || existingCar.image4,
        image5: req.files?.image5?.[0]?.filename || existingCar.image5,
      };

      const updatedCar = await AddCar.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        car: updatedCar,
      });
    } catch (error) {
      console.error("UPDATE VEHICLE ERROR:", error);
      res.status(500).json({
        success: false,
        message: "Server error while updating vehicle",
        error: error.message,
      });
    }
  }
);
router.delete("/deletecar/:id", async (req,res)=>{
  try{
    await AddCar.findByIdAndDelete(req.params.id);
    res.json({message:"car deleted"});
  }catch(err){
    res.status(500).json({message:"Error deleting quote"});
  }
});

module.exports = router;