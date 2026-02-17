import cloudinary from "../config/cloudinary.js";
import { Request, Response, NextFunction } from "express";

export const cloudinaryImageUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const imageFile = req.files?.image;

  // "In request object we will get array of file if we upload multiple
  // file but we want only single file so we will check if we get array of
  // file then we will return error message."

  if (Array.isArray(imageFile)) {
    res.json({
      message: "Please upload a single file."
    });
    return;
  }

  try {
    if (imageFile) {
      const result = await cloudinary.uploader.upload(imageFile.tempFilePath);
      //  "added the image interface in express
      //  request object to store the image details in request
      //  object and we can access it in controller. (types/express.d.ts)"

      req.image = {
        imageId: result.public_id,
        url: result.secure_url
      };
    }
    return next();
  } catch (error) {
    return next(error);
  }
};;
