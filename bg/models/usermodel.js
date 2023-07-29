const mongoose = require("mongoose");
// create Schema
const userSchema= new mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String, 
          required: true,
        },
        age: {
          type: Number,
        },
      },
      { timestamps: true }
    );

    //Create Model
const userData = mongoose.model("userData", userSchema);
module.exports = userData;
// userdata he 1 

// 