const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
  
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

  

    contact: {
      type: String,
      required: true,
    },
      address: {
      type: String,
      required: true,
    },
   
    



  },
  { timestamps: true }
);

module.exports = mongoose.model("info", userSchema);