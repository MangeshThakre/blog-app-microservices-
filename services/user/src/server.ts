import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import userRouter from "./routes/user.js";
import fileUpload from "express-fileupload";
import cloudinaryConfig from "./configuration/cloudinaryConfig.js";
dotenv.config();
const PORT = process.env.PORT || 8081;

const app = express();
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
 

cloudinaryConfig;
// database connection
connectDB();


app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.json("User service is running");
});

app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`);
});
