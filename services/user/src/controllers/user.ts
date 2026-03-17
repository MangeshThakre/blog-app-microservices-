import express from "express";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/isAuth.js";
import { UploadApiOptions } from "cloudinary";
import { IUser } from "../model/user.js";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import { oauth2Client } from "../utils/googleConfig.js";
import cookieOptions from "../utils/cookieOptions.js";

export interface CloudinaryUploadRequest extends Request {
  files?: {
    image: UploadApiOptions;
  };
  user: IUser; // Ensure that the user property is included in the request object and not null or undefined
}

import TryCatch from "../utils/TryCatch.js";

export const loginUser = TryCatch(async (req, res) => {
  const { code } = req.body;
  if (!code) {
    res.status(400).json({
      message: "Authorization code is required"
    });
    return;
  }

  console.log("29");
  const googleRes = await oauth2Client.getToken(code);

  console.log(31);
  oauth2Client.setCredentials(googleRes.tokens);
  console.log(33);
  const userRes = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
  );

  console.log("userRes", userRes.data);

  const { email, name, picture } = userRes.data;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      image: picture
    });
  }

  const jwtToken = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "5d"
  });

  console.log({
    message: "Login success",
    token: jwtToken,
    user
  });

  res.cookie("Token", jwtToken, cookieOptions);
  res.status(200).json({
    message: "Login success",
    token: jwtToken,
    user
  });
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
