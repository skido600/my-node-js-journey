const mongoose = require("mongoose");

const userProfileImageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    orginalName: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    Url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const UserProfile = mongoose.model("profileimage", userProfileImageSchema);

module.exports = UserProfile;
