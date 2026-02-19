import { Request, Response } from "express";
import TryCatch from "../utils/tryCatch.js";
import { sql } from "../utils/db.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getAllBlogs = TryCatch(async (req: Request, res: Response) => {
  const allBlogs = await sql`SELECT * FROM blogs`;

  res
    .status(200)
    .json({ message: "successfully fetch all blogs", result: allBlogs });
});

export const getSingleBlog = TryCatch(async (req: Request, res: Response) => {
  const blogId = req.params.blogId;

  const singleBlog = await sql`SELECT * FROM blogs WHERE id =${blogId}`;

  if (singleBlog.length === 0) {
    res.status(400).json({ message: "blog not found" });
    return;
  }

  const { data } = await axios.get(
    `${process.env.USER_SERVICE}/user/profile/${singleBlog[0].author}`
  );

  res.status(400).json({
    message: "successfully found the blog",
    result: { blog: singleBlog[0], author: data.user }
  });
});

export const addComment = TryCatch(async (req: Request, res: Response) => {
  const blogId = req.params.blogId;
  console.log(req.body);
  const { comment } = req.body;
  const { _id, name } = req.user;
  if (!comment) {
    res.status(400).json({ message: "comment is required" });
    return;
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

export const deleteComment = TryCatch(async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const userId = req.user?._id;

  const result =
    await sql`DELETE FROM comments WHERE id=${commentId} AND user_id=${userId} RETURNING *`;

  if (result.length === 0) {
    res.status(400).json({ message: "comment not found" });
    return;
  }

  res
    .status(200)
    .json({ message: "successfully deleted the comment", result: result[0] });
});

export const saveBlog = TryCatch(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const blogId = req.params.blogId;

  const blog = await sql`select * FROM blogs WHERE id=${blogId}`;
  if (blog.length === 0) {
    res
      .status(400)
      .json({ message: "no blog available related to the blog id" });
    return;
  }

  const result =
    await sql`INSERT INTO saved_blogs (user_id, blog_id) VALUES (${userId} , ${blogId}) RETURNING *`;

  res
    .status(200)
    .json({ message: "successfully save the blog", result: result[0] });
});

export const getSavedBlogs = TryCatch(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const result = await sql`SELECT * FROM saved_blogs WHERE user_id=${userId}`;

  if (result.length === 0) {
    res.status(400).json({ message: "no save blogs" });
  }
  res
    .status(200)
    .json({ message: "successfully got all saved blogs", result: result });
});
