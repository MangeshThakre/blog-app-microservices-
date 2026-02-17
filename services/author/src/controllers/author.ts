import { Request, Response } from "express";
import { sql } from "../utils/db.js";
import TryCatch from "../utils/tryCatch.js";

export const newBlog = TryCatch(async (req: Request, res: Response) => {
  const { title, description, blog_content, category } = req.body;
  const image = req.image;

  // console.log(image);
  // all fields are required
  if (!title || !description || !blog_content || !category || !image) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const userId = req.user?._id;
  const result =
    await sql`INSERT INTO BLOGS (title, description, author, blog_content, category,image) VALUES 
  (${title},${description},${userId}, ${blog_content},${category},${image}) RETURNING *`;
  console.log(result);
  res
    .status(200)
    .json({ message: "New blog created successfully", result: result[0] });
});

export const updateBlog = TryCatch(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const blogId = req.params.id;
  const data = req.body;
  const image = req.image;

  const blog = await sql`SELECT * FROM blogs WHERE id=${blogId}`;

  // check if blog exists
  if (blog.length === 0) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  if (userId !== blog[0].author) {
    res
      .status(403)
      .json({ message: "You are not authorized to update this blog" });
    return;
  }

  const title = data.title || blog[0].title;
  const description = data.description || blog[0].description;
  const blog_content = data.blog_content || blog[0].blog_content;
  const category = data.category || blog[0].category;
  const updatedImage = image || blog[0].image;

  const result = await sql`UPDATE blogs SET
    title=${title},
    description=${description},
    blog_content=${blog_content},
    category=${category},
    image=${updatedImage}
    WHERE id=${blogId} RETURNING *`;

  // console.log(result);

  res
    .status(200)
    .json({ message: "updatedBlog successfully", result: result[0] });
});

export const deleteBlog = TryCatch(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const blogId = req.params.id;

  const blog =
    await sql`DELETE FROM blogs WHERE id=${blogId} AND author=${userId} RETURNING *`;

  if (blog.length === 0) {
    res.status(404).json({
      message: "Blog not found or you are not authorized to delete this blog"
    });
    return;
  }

  res.status(200).json({ message: "blog deleted successfully" });
});
