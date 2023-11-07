const express = require("express");
const router = express.Router();
const Data = require("../models/data");

// Get the list
router.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new list
router.post("/", async (req, res) => {
  const data = new Data({
    title: req.body.title,
    text: req.body.text,
  });
  try {
    const newData = await data.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
