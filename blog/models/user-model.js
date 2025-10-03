const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isverified: {
      type: Boolean,
      default: false,
    },
    ProfileImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profileimage",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userschema);

module.exports = User;
