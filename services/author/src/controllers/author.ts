import { Request, Response } from "express";
import { sql } from "../utils/db.js";
import TryCatch from "../utils/tryCatch.js";

export const newBlog = TryCatch(async (req: Request, res: Response) => {
  const { title, description, blogContent, category } = req.body;
  const image = req.image;

  // console.log(image);
  // all fields are required
  if (!title || !description || !blogContent || !category || !image) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const userId = req.user?._id;
  const result =
    await sql`INSERT INTO BLOGS (title, description, author, blogContent, category,image) VALUES 
  (${title},${description},${userId}, ${blogContent},${category},${image}) RETURNING *`;
  console.log(result);
  res.status(200).json({ message: "New blog created successfully", result });
});
