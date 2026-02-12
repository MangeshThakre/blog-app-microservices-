import express from "express";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email });
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "5d" }
    );

    res.status(200).json({ message: "login success", token, user });
  } catch (error: any) {
    console.log(error);
  }
};
