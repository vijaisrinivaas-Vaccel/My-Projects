import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // ✅ THIS IS THE CORRECT WAY
    (req as any).user = {
      id: decoded.id,
      role: decoded.role,
    };

    console.log("✅ Auth user:", (req as any).user);
    next();
  } catch (err) {
    console.error("❌ JWT verify error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};


export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};

