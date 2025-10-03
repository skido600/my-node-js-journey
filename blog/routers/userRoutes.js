const express = require("express");
const {
  createuser,
  Login,
  GetUser,
  GetAllUser,
} = require("../controllers/user-controller.js");
const authmiddlware = require("../middleware/auth-middlware.js");
const upload = require("../util/multer.js");

const routes = express.Router();

routes.post("/createuser", upload.single("profileImage"), createuser);
routes.post("/login", Login);
routes.get("/getuser/:userid", GetUser);
routes.get("/getalluser", GetAllUser);
module.exports = routes;
