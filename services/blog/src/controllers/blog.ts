import { Request, Response } from "express";
import TryCatch from "../utils/tryCatch.js";
import { sql } from "../utils/db.js";

export const getAllBlogs = TryCatch(async (req: Request, res: Response) => {
  const allBlogs = await sql`SELECT * FROM blogs`;

  res
    .status(200)
    .json({ message: "successfully fetch all blogs", result: allBlogs });
});

export const getSingleBlog = TryCatch(async (req: Request, res: Response) => {
  const blogId = req.params.id;
  const singleBlog = await sql`SELECT * FROM blogs WHERE id =${blogId}`;

  if (singleBlog.length === 0) {
    res.status(400).json({ message: "blog not found" });
  }

  res
    .status(400)
    .json({ message: "successfully found the blog", result: singleBlog[0] });
});

export const addComment = TryCatch(async (req: Request, res: Response) => {
  const blogId = req.params.blogId;
  console.log(req.body);
  const { comment } = req.body;
  const { _id, name } = req.user;
  if (!comment) {
    res.status(400).json({ message: "comment is required" });
  }

  const result =
    await sql`INSERT INTO COMMENTS (comment , user_id, user_name, blog_id) 
    VALUES (${comment}, ${_id}, ${name}, ${blogId}) RETURNING *`;

  res
    .status(200)
    .json({ message: "comment added successfully", result: result[0] });
});

export const getAllComments = TryCatch(async (req: Request, res: Response) => {
  const blogId = req.params.blogId;

  const result = await sql`SELECT * FROM COMMENTS WHERE blog_id=${blogId}`;

  res
    .status(200)
    .json({ message: "successfully got all the comment", result: result });
});
