const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  dataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Data",
  },
  confirmedEmail: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
