import express from "express";
import { getAllBlogs, getSingleBlog, addComment } from "../controllers/blog.js";
import { isAuth } from "../middleware/isAuth.js";
export const BlogRouter = express.Router();

BlogRouter.get("/blog/all", getAllBlogs);
BlogRouter.get("/blog/:id", getSingleBlog);
BlogRouter.post("/comment/:blogId", isAuth, addComment);
