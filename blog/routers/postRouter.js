const express = require("express");
const Postrouter = express.Router();

const authmiddlware = require("../middleware/auth-middlware.js");
const {
  createpost,
  getApost,
  getPostByAuthor,
} = require("../controllers/postmodel.js");
Postrouter.post("/createpost", authmiddlware, createpost);
Postrouter.get("/getpost/:postid", authmiddlware, getApost);
Postrouter.get("/getauthorpost/:id", authmiddlware, getPostByAuthor);

module.exports = Postrouter;
