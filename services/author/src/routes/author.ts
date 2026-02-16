import express from "express";
import { newBlog } from "../controllers/author.js";
import { isAuth } from "../middleware/isAuth.js";
import { cloudinaryImageUpload } from "../middleware/cloudinaryFileUpload.js";

export const authorRouter = express.Router();

authorRouter.post("/blogs/new", isAuth, cloudinaryImageUpload, newBlog);
