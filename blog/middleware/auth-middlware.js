const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
async function authmiddlware(req, res, next) {
  try {
    const authheader = req.headers["authorization"];
    const token = authheader && authheader.split(" ")[1];
    if (!token) {
      return res.status(404).json({ messge: "TOken not found" });
    }
    const decodeToken = jwt.verify(token, process.env.JWTSECRET);
    if (!decodeToken) {
      return res.status(404).json({ messge: "TOken not found" });
    }
    req.user = decodeToken;
    next();
  } catch (error) {
    console.log(error.stack);
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = authmiddlware;
