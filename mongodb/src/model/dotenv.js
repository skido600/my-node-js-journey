import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const mongodburl = process.env.MONGOD_URL;
export { port, mongodburl };
