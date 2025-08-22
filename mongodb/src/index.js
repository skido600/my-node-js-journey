import express from "express";
import { port } from "./model/dotenv.js";
import { connectDb } from "./model/connectdb.js";
import studentRoutes from "./Routes/route.js";
const app = express();
//middleware
app.use(express.json());

app.use("/api/students", studentRoutes);

app.use((_req, res, _next) => {
  res.status(404).json({ error: "Route not found" });
});
app.listen(port, async () => {
  await connectDb();
  console.log(`server running on port ${port}`);
});
