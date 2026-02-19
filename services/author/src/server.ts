import express from "express";
import dotenv from "dotenv";
import { sql } from "./utils/db.js";
import { authorRouter } from "./routes/author.js";
import fileUpload from "express-fileupload";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8082;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS blogs(
        id SERIAL PRIMARY KEY,  
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        blog_content TEXT NOT NULL,
        image JSONB NOT NULL,
        category VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    await sql`CREATE TABLE IF NOT EXISTS comments(
        id SERIAL PRIMARY KEY,  
        comment VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        blog_id VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    await sql`CREATE TABLE IF NOT EXISTS saved_blogs(
        id SERIAL PRIMARY KEY,  
        user_id VARCHAR(255) NOT NULL,
        blog_id VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    console.log("database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

app.use("/api/v1/author", authorRouter);
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Author service is running on port ${PORT}`);
  });
});
