const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
     
    },
     message: {
      type: String,
      required: true,
    },
     from_date: {
  type: Date,
  required: true,
},
to_date: {
  type: Date,
  required: true,
},
     name: {
      type: String,
      required: true,
      
    },
   userId:{
  type: mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
},

    status: {
  type: String,
  enum: ["Not Confirmed yet", "Confirmed", "Cancelled"],
  default: "Not Confirmed yet"
}






  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);