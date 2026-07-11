const express = require("express");
const router = express.Router();
const testimonal = require("../models/testimonal");


router.post("/testimonal", async (req, res) => {
  try {
    const {  name,message } = req.body;
  

    // Validation
    if ( !message ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const savedtestimonal = await testimonal.findOneAndUpdate(
      { message: message },
      {
        name,
        message,
      
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: " successfully",
      data: savedtestimonal,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



router.get("/testiomonaldata", async (req, res) => {
  try {
    const testimonaials = await testimonal.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: testimonal.length,
      data: testimonaials,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});
// router.get("/subscribe/count", async (req, res) => {
//   try {
//     const count = await subscriber.countDocuments();

//     res.status(200).json({
//       success: true,
//       count,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });
router.delete("/deletetestimonial/:id", async (req,res)=>{
  try{
    await testimonal.findByIdAndDelete(req.params.id);
    res.json({message:" deleted testimonial"});
  }catch(err){
    res.status(500).json({message:"Error deleting quote"});
  }
});


module.exports = router;
