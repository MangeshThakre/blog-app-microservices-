import express from "express";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/isAuth.js";
import { UploadApiOptions } from "cloudinary";
import { IUser } from "../model/user.js";
import { v2 as cloudinary } from "cloudinary";

export interface CloudinaryUploadRequest extends Request {
  files?: {
    image: UploadApiOptions;
  };
  user: IUser; // Ensure that the user property is included in the request object and not null or undefined
}

import TryCatch from "../utils/TryCatch.js";

export const loginUser = TryCatch(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ name, email });
    await user.save();
  }

  const token = jwt.sign({ user: user }, process.env.JWT_SECRET as string, {
    expiresIn: "5d"
  });

  res.status(200).json({ message: "login success", token, user });
});

export const me = TryCatch(async (req: AuthRequest, res) => {
  const user = req.user;
  res.status(200).json({ message: "user Data", user: user });
});

export const getUserProfile = TryCatch(async (req: AuthRequest, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "user Data", user: user });
});

export const UpdateUserProfile = TryCatch(async (req: AuthRequest, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { ...userData },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User updated", user });
});

export const updateUserProfilePicture = TryCatch(
  async (req: AuthRequest, res) => {
    const file = req.files;
    if (!file || !file.image) {
      res.status(400).json({ message: "No image file provided" });
    }
    const result = await cloudinary.uploader.upload(file.image.tempFilePath);

    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      { image: { imageId: result.public_id, url: result.secure_url } },
      { new: true }
    );

    res.status(200).json({
      message: "User profile picture updated",
      user: updatedUser
    });
  }
);
