const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./schemas/userSchema");
const app = express();

//middleware
app.use(express.json());
app.use(cors());
//routes

//get donors
app.get("/donors/filter", async (req, res) => {
  const { bloodType } = req.query;
  let donors;

  if (bloodType) {
    donors = await User.find({ bloodType });
  } else {
    donors = await User.find();
  }

  res.status(200).json(donors);
});

app.get("/donors", async (req, res) => {
  const donors = await User.find();
  res.status(200).json(donors);
});

//auth routes
app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  } else {
    return res.status(200).json({ ...user, message: "Login successful" });
  }
});

app.post("/auth/register", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    const newUser = await User.create(req.body);
    res.status(200).json({...newUser, message: "User created successfully"});
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/blood-donation")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
