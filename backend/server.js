require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Allow cross-origin requests from http://localhost:3001
app.use(cors({ origin: "http://localhost:3001" }));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const dataRouter = require("./routes/data");
app.use("/data", dataRouter);
const userRouter = require("./routes/users");
app.use("/user", userRouter);
const emailRouter = require("./routes/email");
app.use("/email", emailRouter);

app.listen(3000, () => console.log("Server started"));
