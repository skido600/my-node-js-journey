const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOD_URL);
    console.log("connected to mongodb ", mongoose.connection.name);
  } catch (error) {
    console.log(error);
    throw new Error("issue connecting to db");
  }
};

module.exports = connectDb;
