import { Request, Response } from "express";
import Salary from "../models/Salary.model";
import Income from "../models/Income.model";

/* ================= GET INCOME SUMMARY ================= */
export const getIncomeSummary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const salaryDoc = await Salary.findOne({ userId });
    const otherIncome = await Income.find({ userId }).sort({ createdAt: -1 });

    const salaryAmount = salaryDoc?.amount || 0;
    const otherTotal = otherIncome.reduce(
      (sum, inc) => sum + (inc.amount || 0),
      0
    );

    res.json({
      salary: salaryAmount,
      otherIncome,
      totalIncome: salaryAmount + otherTotal,
    });
  } catch (err) {
    console.error("❌ getIncomeSummary error:", err);
    res.status(500).json({ message: "Failed to fetch income summary" });
  }
};

/* ================= SET / UPDATE SALARY ================= */
export const setSalary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { salary } = req.body; // ✅ FIX

    if (!salary || salary <= 0) {
      return res.status(400).json({ message: "Invalid salary amount" });
    }

    const savedSalary = await Salary.findOneAndUpdate(
      { userId },
      { amount: salary }, // ✅ map salary → amount
      { upsert: true, new: true }
    );

    res.json(savedSalary);
  } catch (err) {
    console.error("❌ setSalary error:", err);
    res.status(500).json({ message: "Failed to update salary" });
  }
};

/* ================= ADD OTHER INCOME ================= */
export const addIncome = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { source, amount } = req.body;

    if (!source || !amount) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const income = await Income.create({
      userId,
      source,
      amount,
    });

    res.status(201).json(income);
  } catch (err) {
    console.error("❌ addIncome error:", err);
    res.status(500).json({ message: "Failed to add income" });
  }
};
