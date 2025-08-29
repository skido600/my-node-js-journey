const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connection = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: parseInt(process.env.PGPORT),
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
connection
  .connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));
module.exports = { connection };
