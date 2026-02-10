import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model";

/* ================= GET ALL USERS ================= */
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.json(users);
};

/* ================= CREATE USER ================= */
export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: "user",
  });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
};

/* ================= DELETE USER ================= */
export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted" });
};
