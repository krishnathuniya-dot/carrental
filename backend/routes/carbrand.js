const express = require("express");
const router = express.Router();
const brands = require("../models/brands");
const mongoose = require("mongoose");


router.post("/branddata", async (req, res) => {
  try {
    const {  brand } = req.body;
  

    
    if ( !brand  ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const savebrands = await brands.findOneAndUpdate(
      { brand:brand },
      {
      
        brand,
      
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: "brand created",
      data: savebrands,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



router.get("/carbrand", async (req, res) => {
  try {
    const brandes = await brands.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: brands.length,
      data: brandes,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});
router.get("/brand/count", async (req, res) => {
  try {
    const count = await brands.countDocuments();

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
router.get("/brandfetch/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await brands.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error("Fetch vehicle error:", error);
    res.status(500).json({ message: "Error fetching vehicle" });
  }
});
router.put("/brandupdate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, } = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updatedUser = await brands.findByIdAndUpdate(
      id,
      {
        brand,
       
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "brand updated successfully",
      user: {
        id: updatedUser._id,
        brand: updatedUser.brand,
       
        
      },
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
router.delete("/deletebrand/:id", async (req,res)=>{
  try{
    await brands.findByIdAndDelete(req.params.id);
    res.json({message:"brand deleted"});
  }catch(err){
    res.status(500).json({message:"Error deleting quote"});
  }
});

module.exports = router;
