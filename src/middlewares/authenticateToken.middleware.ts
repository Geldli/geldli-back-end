import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction, RequestHandler } from "express";

import { AuthRequest } from "../interfaces/authenticateToken.interfaces";

dotenv.config();

export default function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = data;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" });
  }
}
