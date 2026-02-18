import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import { BlogRouter } from "./routes/blog.js";
import fileUpload from "express-fileupload";
dotenv.config();
const PORT = process.env.PORT || "8083";

const app = express();
app.use(express.json()); // to read json value
app.use(express.urlencoded({ extended: true }));  // to read url encoded
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);  // to read form data

app.use("/api/v1/", BlogRouter);

app.listen(PORT, () => {
  console.log(`app running successfully on port:${PORT}`);
});
