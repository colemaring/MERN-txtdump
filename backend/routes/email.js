const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/users");
const Data = require("../models/data");
const jwt = require("jsonwebtoken"); //authenticates the user
const bcrypt = require("bcrypt"); //used to hash passwords

router.use(express.json());

// click the confirmation link route for email verification
router.get("/confirmation/:token", async (req, res) => {
  try {
    const { email } = jwt.verify(req.params.token, process.env.JWT_SECRET);
    // because our emails are all unique
    await User.findOneAndUpdate({ email: email }, { confirmedEmail: true });
    return res.redirect("http://localhost:3001/login");
  } catch (error) {
    console.log(error);
    res.send("Error confirming email");
  }

  //   return res.redirect("http://localhost:3001/login");
});

// send confirmation email route
router.post("/send-email", async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASS,
    },
  });

  console.log(req.body); // Add this line

  const emailToken = jwt.sign(
    { email: req.body.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  const url = `http://localhost:3000/email/confirmation/${emailToken}`;

  try {
    let info = await transporter.sendMail({
      from: '"Txt Dump" <TxtDump@verify.com>',
      to: req.body.email,
      subject: "Txt Dump Email Verification",
      html: `Hey ${req.body.username}, your email verficiation link will expire in 1 hour: <a href="${url}">${url}</a>`,
    });

    console.log(info);
    res.send({ status: "Email sent" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "Failed to send email, is it in the correct format?" });
  }
});

// send reset password email route
router.post("/forgot", async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASS,
    },
  });

  const user = await User.findOne({ email: req.body.email });

  // If the user does not exist or has not been confirmed, send an error message
  if (!user || !user.confirmedEmail) {
    return res.status(400).send("Email not found or not confirmed");
  }

  console.log(req.body); // Add this line

  const emailToken = jwt.sign(
    { email: req.body.email, password: req.body.password },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  const url = `http://localhost:3000/email/confirmforget/${emailToken}`;

  try {
    let info = await transporter.sendMail({
      from: '"Txt Dump" <TxtDump@verify.com>',
      to: req.body.email,
      subject: "Txt Dump Password Reset",
      html: `Somebody just tried to reset your password for TXT Dump. If this wasnt you, you may safely ignore this email. If this was your, your link will expire in 1 hour: <a href="${url}">${url}</a>`,
    });

    res.send({ status: "Email sent" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "Failed to send email, is it in the correct format?" });
  }
});

// click the confirmation link route for reset password
router.get("/confirmforget/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { email, password } = jwt.verify(token, process.env.JWT_SECRET);

    // Here you should search for the user in your database using the email
    // from the token and update their password. This is just a placeholder.
    const user = await User.findOne({ email });

    // THIS NEEDS TO BE HASHED
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword; // Update the password
    await user.save(); // Save the updated user to the database

    return res.redirect("http://localhost:3001/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to reset password");
  }
});

// click the confirmation link route for sharing
router.get("/share", async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASS,
    }
  });

  //searches for the user we are sending the share link to
  const user = await User.findOne({ email: req.body.email });

  if(!user || !user.confirmedEmail) {
    return res.status(400).send("Email not found or not confirmed");
  }

  console.log(req.body);

  const emailToken = jwt.sign(
    { email: req.body.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  const url = 'http://localhost:3000/email/confirmshare/${emailToken}';

  try {
    let info = await transporter.sendMail({
      from: '"Txt Dump" <TxtDump@verify.com>',
      to: req.body.email,
      subject: "Txt Dump Share Link",
      html: `Hey ${req.body.username}, your share link will expire in 24 hours: <a href="${url}">${url}</a>`,
    })
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "Failed to send email, is it in the correct format?" });
  }
});

// click the confirmation link route for sharing
router.get("/confirmshare/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const {email} = jwt.verify(token, process.env.JWT_SECRET);

    return res.redirect("http://localhost:3001/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to share");
  }
});


module.exports = router;
