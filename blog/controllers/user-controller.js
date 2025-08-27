const User = require("../models/user-model.js");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
async function createuser(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(404).json({ message: "missing fields rquired" });
    }
    const userdetails = await User.findOne({
      email,
    });
    if (userdetails) {
      return res.status(400).json({ error: "user already exist" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });
    await newUser.save();
    return res.status(201).json({
      message: `user with the username ${newUser.username} is created successfully`,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ message: `internal server error ${error}` });
  }
}

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "missing fields rquired" });
    }
    const userdetails = await User.findOne({
      email,
    });
    if (!userdetails) {
      return res.status(404).json({ error: "user  does not exist" });
    }
    const isMatch = await bcrypt.compare(password, userdetails.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        userid: userdetails._id,
        email: userdetails.email,
      },
      process.env.JWTSECRET,
      { expiresIn: "30mins" }
    );
    if (!token) {
      return res.status(404).json({ messge: "TOken not found" });
    }
    return res.status(201).json({
      message: `user Login successfully`,
      token,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ message: `internal server error ${error}` });
  }
}
module.exports = { createuser, Login };
