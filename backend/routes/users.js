const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Data = require("../models/data");
const bcrypt = require("bcrypt"); //used to hash passwords
const jwt = require("jsonwebtoken"); //authenticates the user

router.use(express.json());

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).send("User added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving user");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send("Invalid username or password");
  }

  const token = jwt.sign({ username: user.username }, "secret_key");
  res.send({ token });
});

// app.listen(3000, () => console.log("Server started"));

module.exports = router;
