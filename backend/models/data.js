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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = {
  Data: mongoose.model("Data", dataSchema),
  User: mongoose.model("User", userSchema)
};

