import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import userRouter from "./routes/user.js";

dotenv.config();
const PORT = process.env.PORT || 8081;

const app = express();

// database connection
connectDB();

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.json("User service is running");
});

app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`);
});