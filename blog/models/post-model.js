const mongoose = require("mongoose");

const Postschema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    context: {
      type: String,
      required: true,
      unique: true,
    },
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamp: true }
);

const post = mongoose.model("Post", Postschema);

module.exports = post;
