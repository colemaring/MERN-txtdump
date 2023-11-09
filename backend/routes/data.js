const express = require("express");
const router = express.Router();
const Data = require("../models/data");

// Get the list, for a specific user
// used when user logs in
router.get("/:id", async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new list, only for when new user is made
// used for user account creation
router.post("/:id", async (req, res) => {
  // create a new list
  const data = new Data({});
  try {
    const newData = await data.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Append a new object to the array for a specific user
// used for the create button
router.put("/:id", async (req, res) => {
  try {
    const updatedData = await Data.findByIdAndUpdate(
      req.params.id,
      { $push: { items: req.body } },
      { new: true }
    );
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove an object at a certain index in the list for a specific user
router.put("/:id/removeAtIndex/:index", async (req, res) => {
  try {
    const index = req.params.index;
    let unset = {};
    unset[`items.${index}`] = 1;
    await Data.findByIdAndUpdate(req.params.id, { $unset: unset });
    const updatedData = await Data.findByIdAndUpdate(
      req.params.id,
      { $pull: { items: null } },
      { new: true }
    );
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an object at a certain index in the list for a specific user
router.put("/:id/:index", async (req, res) => {
  try {
    const index = req.params.index;
    let set = {};
    set[`items.${index}`] = req.body;
    const updatedData = await Data.findByIdAndUpdate(
      req.params.id,
      { $set: set },
      { new: true }
    );
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
