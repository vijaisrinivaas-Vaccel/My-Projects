import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import Admin from "../models/Admin.model";
import Expense from "../models/Expense.model";

/* ================= REGISTER ================= */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "admin") {
      const exists = await Admin.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      await Admin.create({
        username,
        email,
        password: hashedPassword,
        role: "admin",
      });

      return res.json({ message: "Admin registered successfully" });
    }

    if (role === "user") {
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: "User already exists" });
      }

      await User.create({
        username,
        email,
        password: hashedPassword,
        role: "user",
      });

      return res.json({ message: "User registered successfully" });
    }

    return res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    let user: any = await User.findOne({ email });
    if (!user) user = await Admin.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!, // ✅ SINGLE SOURCE
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET LOGGED-IN USER ================= */
export const getMe = async (req: Request, res: Response) => {
  try {
    // 🔥 JWT already verified in middleware
    const { id, role } = (req as any).user;

    const Model = role === "admin" ? Admin : User;
    const user = await Model.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET MY EXPENSES ================= */
export const getMyExpenses = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const userExpenses = await Expense.find({ userId }).sort({ createdAt: -1 });
    res.json(userExpenses);
  } catch {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};
