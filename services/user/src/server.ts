import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

connectDB();

app.get("/", (req, res) => {
  res.json("User service is running");
});

app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`);
});
