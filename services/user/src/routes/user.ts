import express from "express";
import User from "../model/user.js";
import { loginUser } from "../controllers/user.js";

const UserRouter = express.Router();

UserRouter.post("/login", loginUser);


export default UserRouter;
