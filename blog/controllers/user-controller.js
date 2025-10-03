const User = require("../models/user-model.js");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Usermodel = require("../models/user-model");

const cloudinary = require("../util/cloudinary.js");
const UserProfile = require("../models/profileimage.js");

dotenv.config();
async function createuser(req, res) {
  if (!req.file) {
    return res
      .status(404)
      .json({ sucess: false, message: "profile image required" });
  }
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(404)
        .json({ sucess: false, message: "missing fields rquired" });
    }
    const userdetails = await User.findOne({
      email,
    });
    if (userdetails) {
      return res
        .status(400)
        .json({ sucess: false, error: "user with the email already exist" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });
    await newUser.save();
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);

    const newUserImage = new UserProfile({
      userId: newUser._id,
      orginalName: req.file.originalname,
      publicId: result.public_id,
      Url: result.secure_url,
    });

    await newUserImage.save();

    newUser.ProfileImage = newUserImage._id;
    await newUser.save();

    return res.status(201).json({
      sucess: true,
      message: `user with the username ${newUser.username} is created successfully`,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ message: `internal server error `, error: error.message });
  }
}

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ sucess: false, message: "missing fields rquired" });
    }
    const userdetails = await User.findOne({
      email,
    });
    if (!userdetails) {
      return res
        .status(404)
        .json({ sucess: false, error: "user  does not exist" });
    }
    const isMatch = await bcrypt.compare(password, userdetails.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ sucess: false, error: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        userid: userdetails._id,
        username: userdetails.username,
      },
      process.env.JWTSECRET,
      { expiresIn: "30mins" }
    );
    if (!token) {
      return res.status(404).json({ sucess: false, messge: "TOken not found" });
    }
    return res.status(201).json({
      sucess: true,
      message: `user Login successfully`,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ message: `internal server error `, error: error.message });
  }
}

const GetUser = async (req, res) => {
  try {
    const userid = req.params.userid;

    if (!userid) {
      return res
        .status(404)
        .json({ sucess: false, error: "invalid student id " });
    }
    const finduser = await Usermodel.findById(userid)
      .select("-password")
      .populate("ProfileImage", "Url publicId");
    console.log(finduser);
    if (!finduser) {
      return res.status(404).json({ sucess: false, error: "user not found" });
    }
    return res.status(200).json({
      sucess: true,
      message: "student found successfully",
      data: finduser,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ message: `internal server error `, error: error.message });
  }
};

const GetAllUser = async (_req, res) => {
  try {
    const users = await Usermodel.find();

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ sucess: false, error: "user  does not exist" });
    }

    return res.status(200).json({
      sucess: true,
      message: `users ${users.length} fetched successfully`,
      data: users,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ message: `internal server error `, error: error.message });
  }
};

module.exports = { createuser, Login, GetUser, GetAllUser };
