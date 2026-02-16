import express from "express";
import { newBlog } from "../controllers/author.js";
import { isAuth } from "../middleware/isAuth.js";


export const authorRouter = express.Router();

authorRouter.post("/blogs/new",isAuth, newBlog);
