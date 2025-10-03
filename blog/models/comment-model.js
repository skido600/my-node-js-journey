const mongoose = require("mongoose");

const Commentschema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      unique: true,
    },
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const comment = mongoose.model("Comment", Commentschema);

module.exports = comment;
