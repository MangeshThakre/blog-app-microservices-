import { Request, Response } from "express";


export const newBlog = (req: Request, res: Response) => {
   console.log("body", req.body, "image", req.image, "user", req.user);
  res.status(200).json({ message: "New blog created successfully" });
};
