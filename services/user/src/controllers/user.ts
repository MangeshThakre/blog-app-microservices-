import express from "express";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/isAuth.js";

import TryCatch from "../utils/tryCatch.js";

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

export const getUserProfile = TryCatch(async (req: AuthRequest, res) => {
  const user = req.user;
  res.status(200).json({ message: "user Data", user: user });
});
