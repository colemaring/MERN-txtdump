const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Data = require("../models/data");
const bcrypt = require("bcrypt"); //used to hash passwords
const jwt = require("jsonwebtoken"); //authenticates the user

router.use(express.json());

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("Username, email and password are required");
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send("Email already has an account");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const data = new Data({});
    try {
      const newData = await data.save();
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        dataId: newData._id, //this is the id of the list
      });
      await newUser.save();
      res
        .status(201)
        .send({ message: "User added successfully", listId: newData._id });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving user");
  }
});



router.post("/login", async (req, res) => {

  const { loginType, password } = req.body;
  
  const user = await User.findOne ({
    $or: [{username: loginType}, {email: loginType}]
  });
  console.log(loginType, password);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send("Invalid username or password");
  }

  res.send({ message: "Logged in successfuly", listId: user.dataId, username: user.username });
});

module.exports = router;
