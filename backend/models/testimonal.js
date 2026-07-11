const mongoose = require("mongoose");

const testimonalSchema = new mongoose.Schema(
  {
      name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },




  },
  { timestamps: true }
);

module.exports = mongoose.model("testimonal", testimonalSchema);