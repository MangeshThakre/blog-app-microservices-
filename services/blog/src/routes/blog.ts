import express from "express";
import {
  getAllBlogs,
  getSingleBlog,
  addComment,
  getAllComments,
  deleteComment,
  saveBlog,
  getSavedBlogs
} from "../controllers/blog.js";
import { isAuth } from "../middleware/isAuth.js";
export const BlogRouter = express.Router();

BlogRouter.get("/blog/all", getAllBlogs);
BlogRouter.get("/blog/:blogId", getSingleBlog);
BlogRouter.post("/comment/:blogId", isAuth, addComment);
BlogRouter.get("/comment/:blogId", getAllComments);
BlogRouter.delete("/comment/:commentId", isAuth, deleteComment);
BlogRouter.post("/save/:blogId", isAuth, saveBlog);
BlogRouter.get("/save/blog/all", isAuth, getSavedBlogs);