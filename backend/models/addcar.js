const mongoose = require("mongoose");

const addcarSchema = new mongoose.Schema(
  
     {
    vehicleTitle: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleOverview: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
      trim: true,
    },
    modelYear: {
      type: Number,
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    accessories: {
      type: [String],
      default: [],
    },

    image1: {
      type: String,
      default: "",
    },
    image2: {
      type: String,
      default: "",
    },
    image3: {
      type: String,
      default: "",
    },
    image4: {
      type: String,
      default: "",
    },
    image5: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }

  
 
);

module.exports = mongoose.model("addcar", addcarSchema);