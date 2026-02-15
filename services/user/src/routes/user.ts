import express from "express";
import {
  me,
  loginUser,
  getUserProfile,
  updateUserProfilePicture
} from "../controllers/user.js";

import { isAuth } from "../middleware/isAuth.js";

const UserRouter = express.Router();

UserRouter.post("/login", loginUser);
UserRouter.get("/me", isAuth, me);
UserRouter.get("/profile/:id", isAuth, getUserProfile);
UserRouter.put("/profilePicture", isAuth, updateUserProfilePicture);

export default UserRouter;
