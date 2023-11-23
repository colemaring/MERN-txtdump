require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const https = require("https");
const fs = require("fs");

// Allow cross-origin requests from http://localhost:3001
// app.use(cors({ origin: "http://localhost:3001" }));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const authenticateJWTToken = require("./middleware/tokenAuthenticate");
const dataRouter = require("./routes/data");
app.use("/data", authenticateJWTToken, dataRouter);

const userRouter = require("./routes/users");
app.use("/user", userRouter);

const emailRouter = require("./routes/email");
app.use("/email", emailRouter);

const httpsServer = https.createServer(
  {
    key: fs.readFileSync("/etc/letsencrypt/live/txtdump.xyz/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/txtdump.xyz/fullchain.pem"),
  },
  app
);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

httpsServer.listen(443, "0.0.0.0", () => console.log("Server started"));
