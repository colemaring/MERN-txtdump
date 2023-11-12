const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  dataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Data",
  },
});

module.exports = mongoose.model("User", userSchema);
