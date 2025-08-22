import mongoose from "mongoose";
import { mongodburl } from "./dotenv.js";

const connectDb = async () => {
  try {
    await mongoose.connect(mongodburl);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
    throw new Error("issue connecting to db");
  }
};

export { connectDb };
