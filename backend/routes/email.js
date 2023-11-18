const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/users");
const Data = require("../models/data");
const jwt = require("jsonwebtoken"); //authenticates the user

router.use(express.json());

// click the confirmation link route
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

    res.send({ status: "Email sent" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "Failed to send email, is it in the correct format?" });
  }
});

module.exports = router;
