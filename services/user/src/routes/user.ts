import express from "express";
import User from "../model/user.js";

const UserRouter = express.Router();

UserRouter.get("/", async (req, res) => {});

export default UserRouter;
