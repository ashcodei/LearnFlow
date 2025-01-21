import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomJwtPayload } from "../types/express";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload; // Cast the payload
    req.user = decoded; // Attach the decoded payload to req.user
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
