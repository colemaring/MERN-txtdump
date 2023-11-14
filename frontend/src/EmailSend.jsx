import SignUp from "./SignUp";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";



const nodemailer = require("nodemailer");


export default function EmailSend() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: "txtdump563@gmail.com", // generated brevo user
        pass: "Chdgr98NWmFZf0KJ", // generated brevo password
        },
  });

  // send mail with defined transport object
    let info =  transporter.sendMail({
        from: '"txtdump563@gmail.com', // sender address
        to: "john@domain.com", // list of receivers
        subject: "Confirm Txt Dump Account", // Subject line
        text: "Hello" + username +" , Thank you for signing up to our txt dump app", // plain text body
    });

    try {
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    } catch (error) {
        console.log(error.message);
    }
 
}