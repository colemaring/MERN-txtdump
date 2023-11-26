const express = require("express");
const router = express.Router();
const User = require("../models/users"); // model for user data
const Data = require("../models/data"); // model for additional user data
const bcrypt = require("bcrypt"); //used to hash passwords
const jwt = require("jsonwebtoken"); //authenticates the user

// middleware to parse JSON request bodies
router.use(express.json());

// route for user signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  // this will be handled on frontend
  if (!username || !email || !password) {
    return res.status(400);
  }

  const userByEmail = await User.findOne({ email });
  if (userByEmail) {
    return res.status(400).send("Email is already taken");
  }

  const userByUsername = await User.findOne({ username });
  if (userByUsername) {
    return res.status(400).send("Username is already taken");
  }

  // hash the password
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

// route for user login
router.post("/login", async (req, res) => {
  const { loginType, password } = req.body;

  const user = await User.findOne({
    $or: [{ username: loginType }, { email: loginType }],
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send("Invalid username or password");
  }

  if (!user.confirmedEmail) {
    return res.status(400).send("Please confirm your email before logging in");
  }

  //since the users email was confirmed we can now give them a token when they login
  const loginToken = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET
  );

  try {
    res.send({
      message: "Logged in successfuly",
      listId: user.dataId,
      username: user.username,
      confirmedEmail: user.confirmedEmail,
      loginToken: loginToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while logging in" });
  }
});

module.exports = router;
