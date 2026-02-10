import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.get("/", (req, res) => {
  res.json("User service is running");
});

app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`);
});
