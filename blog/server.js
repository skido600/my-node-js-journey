const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./models/connectdb");
const userRoute = require("./routers/userRoutes");

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use("/auth", userRoute);
const port = process.env.PORT;

app.listen(port, async () => {
  await connectDb();
  console.log(`server runnig on port ${port}`);
});
