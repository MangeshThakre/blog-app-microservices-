import express from "express";
import { getUserProfile, loginUser } from "../controllers/user.js";
import { isAuth } from "../middleware/isAuth.js";

const UserRouter = express.Router();

UserRouter.post("/login", loginUser);
UserRouter.get("/profile", isAuth, getUserProfile);

export default UserRouter;
