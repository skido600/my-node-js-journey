const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./models/connectdb");
const userRoute = require("./routers/userRoutes");
const PostRoute = require("./routers/postRouter");
const commentRoute = require("./routers/commentRoute");

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use("/auth/v1", userRoute);
app.use("/post/v1", PostRoute);
app.use("/user", commentRoute);
const port = process.env.PORT;

app.listen(port, async () => {
  await connectDb();
  console.log(`server runnig on port ${port}`);
});

// nodemailer
//joi validator
//multer
//cloudinary
// fetch data from external api
//git and github
