const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    dob: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },
      Address: {
      type: String,
      required: true,
    },
     city: {
      type: String,
        default: "",
    }, 
     country: {
      type: String,
        default: "",
    },
    
    



  },
  { timestamps: true }
);

module.exports = mongoose.model("profile", userSchema);