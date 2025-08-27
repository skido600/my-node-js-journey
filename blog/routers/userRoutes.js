const express = require("express");
const { createuser, Login } = require("../controllers/user-controller.js");
const authmiddlware = require("../middleware/auth-middlware.js");

const routes = express.Router();

routes.post("/createuser", createuser);
routes.post("/login", Login);

module.exports = routes;
