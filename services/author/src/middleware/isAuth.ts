import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // check authorization header present or not and split the token from "Bearer <token>"
  // if not present then check in cookies for token
  const token =
    (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
    (req.cookies && Object.keys(req.cookies).length >= 1 && req.cookies.Token);

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const payLoad = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
    if (!payLoad) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.user = payLoad.user;
    return next();
    
  } catch (err) {
    console.log("jwt error", err);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};