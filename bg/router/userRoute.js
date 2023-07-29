const express = require("express");
const mongoose = require("mongoose");
const userData = require('../models/usermodel')
//userdata he 

const router = express.Router();

//create api

router.post("/", async (req, res) => {

  try {
    const userData = require("../models/usermodel");
    const { name, email, age } = req.body;
    const user = await userData.findOne({ email: email });

    if (user) {
      res.status(401).send("User already registerd" )
    }
    else {
      const userAdded = await userData.create({
        name: name,
        email: email,
        age: age,

      }); 
      res.status(201).json(userAdded);
    }

  } catch (error) {
    console.log(error);
    res.send(400).json({ error: error.message })
  }
});

//Read Operation
router.get("/data", async (req, res) => {
  try {
    const allUsers = await userData.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

//Get single user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await userData.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Delete Operation
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userData.findByIdAndDelete({ _id: id });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

//Update Operation put/patch 
router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updateUser = await userData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
    console.log(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


module.exports = router;

