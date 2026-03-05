import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import { BlogRouter } from "./routes/blog.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import redis, { createClient } from "redis";
import { Connection } from "@neondatabase/serverless";
import { startCacheConsumer } from "./utils/consumer.js";
dotenv.config();

const PORT = process.env.PORT || "8083";

startCacheConsumer();
const app = express();
app.use(express.json()); // to read json value
app.use(express.urlencoded({ extended: true })); // to read url encoded
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
); // to read form data
app.use(cors());

export const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient
  .connect()
  .then(() => {
    console.log("connect to redis");
  })
  .catch(console.error);

app.use("/api/v1/", BlogRouter);

app.listen(PORT, () => {
  console.log(`app running successfully on port:${PORT}`);
});
