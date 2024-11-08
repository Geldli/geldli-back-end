import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../interfaces/authenticateToken.interfaces";
dotenv.config();
export default function continueIfLogged(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.authToken;
    console.log(token)
    if(token) {
      console.log('yes token')
      next()
    } else {
      console.log('no token')
      res.statusCode = 301;
      res.setHeader("Location", "http://localhost:8000");
      res.send();
    }
  } catch(err) {
    return res.status(403).json({ message: "Forbidden" });
  }
}