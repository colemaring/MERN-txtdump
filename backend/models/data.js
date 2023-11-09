const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
});

const dataSchema = new mongoose.Schema({
  items: [itemSchema],
});

module.exports = mongoose.model("Data", dataSchema);
