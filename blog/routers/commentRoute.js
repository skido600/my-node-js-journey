const express = require("express");
const authmiddlware = require("../middleware/auth-middlware");
const { createComment } = require("../controllers/commentModel");
const commentRoute = express.Router();

commentRoute.post("/postcomment", authmiddlware, createComment);

module.exports = commentRoute;
