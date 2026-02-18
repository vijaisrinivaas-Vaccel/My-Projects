import e, { Request, Response } from "express";
import Salary from "../models/Salary.model";
import Income from "../models/Income.model";
import CurrentBalance from "../models/CurrentBalance.model";

/* ================= GET INCOME SUMMARY ================= */
export const getIncomeSummary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;

    const salaryDoc = await Salary.findOne({ userId, month, year });

    const otherIncome = await Income.find({
      userId,
      source: { $ne: "Monthly Salary" },
    }).sort({ createdAt: -1 });

    const salaryAmount = salaryDoc?.amount || 0;
    const otherTotal = otherIncome.reduce((sum, inc) => sum + (inc.amount || 0), 0);
    const totalIncome = salaryAmount + otherTotal;

    let balanceDoc = await CurrentBalance.findOne({ userId });

    if (!balanceDoc) {
      balanceDoc = await CurrentBalance.create({
        userId,
        currentBalance: 0,
      });
    }

    res.json({
      salary: salaryAmount,
      isCredited: salaryDoc?.isCredited ?? false,
      otherIncome,
      totalIncome,
      currentBalance: balanceDoc.currentBalance,
    });
  } catch (err) {
    console.error("getIncomeSummary error:", err);
    res.status(500).json({ message: "Failed to fetch income summary" });
  }
};



export const salaryCredited = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const salary = await Salary.findOne({ userId, month, year });

    if (!salary) {
      return res.status(404).json({ message: "Salary not set for this month" });
    }

    if (salary.isCredited) {
      return res.status(400).json({
        message: "Salary already credited for this month",
      });
    }

    salary.isCredited = true;
    salary.creditedAt = new Date();
    await salary.save();

    // Create income entry
    await Income.create({
      userId,
      source: "Monthly Salary",
      amount: salary.amount,
    });

    // Increase balance
    const balanceDoc = await CurrentBalance.findOneAndUpdate(
      { userId },
      { $inc: { currentBalance: salary.amount } },
      { new: true, upsert: true }
    );

    res.json({
      message: "Salary credited successfully",
      updatedBalance: balanceDoc.currentBalance,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error crediting salary",
    });
  }
};


/* ================= SET / UPDATE SALARY ================= */
export const setSalary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { salary } = req.body;

    if (!salary || salary <= 0) {
      return res.status(400).json({ message: "Invalid salary amount" });
    }

    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const savedSalary = await Salary.findOneAndUpdate(
      { userId, month, year },
      {
        amount: salary,
        isCredited: false,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.json(savedSalary);
  } catch (err) {
    console.error("setSalary error:", err);
    res.status(500).json({ message: "Failed to update salary" });
  }
};

/* ================= ADD OTHER INCOME ================= */
export const addIncome = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { source, amount } = req.body;

    const numericAmount = Number(amount);

    if (!source || isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: "Invalid income data" });
    }

    const income = await Income.create({
      userId,
      source,
      amount: numericAmount,
    });

    const balanceDoc = await CurrentBalance.findOneAndUpdate(
      { userId },
      { $inc: { currentBalance: numericAmount } },
      { new: true, upsert: true }
    );

    return res.status(201).json({
      income,
      updatedBalance: balanceDoc?.currentBalance ?? 0,
    });

  } catch (err) {
    console.error("addIncome error:", err);
    return res.status(500).json({ message: "Failed to add income" });
  }
};


/* ================= DELETE OTHER INCOME ================= */
export const deleteAddedIncome = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const incomeId = req.params.id;

    // First find income (DO NOT delete yet)
    const income = await Income.findOne({
      _id: incomeId,
      userId: userId,
      source: { $ne: "Monthly Salary" },
    });

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    // Delete income
    await Income.deleteOne({ _id: incomeId });

    // Decrease balance safely
    let amountToDeduct = income.amount || 0;
    const balanceDoc = await CurrentBalance.findOneAndUpdate(
      { userId },
      { $inc: { currentBalance: -amountToDeduct } },
      { new: true }
    );

    return res.json({
      message: "Income deleted successfully",
      updatedBalance: balanceDoc?.currentBalance ?? 0,
    });

  } catch (err) {
    console.error("deleteIncome error:", err);
    return res.status(500).json({ message: "Failed to delete income" });
  }
};

export const updateAddedIncome = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const incomeId = req.params.id;
    const { source, amount } = req.body;
    const numericAmount = Number(amount);

    if (!source || isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: "Invalid income data" });
    }

    // First find income (DO NOT update yet)
    const income = await Income.findOne({
      _id: incomeId,
      userId: userId,
      source: { $ne: "Monthly Salary" },
    });

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    // Calculate difference for balance update
    const amountDifference = numericAmount - (income.amount || 0);

    // Update income
    income.source = source;
    income.amount = numericAmount;
    await income.save();

    // Update balance safely
    const balanceDoc = await CurrentBalance.findOneAndUpdate(
      { userId },
      { $inc: { currentBalance: amountDifference } },
      { new: true }
    );

    return res.json({
      income,
      updatedBalance: balanceDoc?.currentBalance ?? 0,
    });
  } catch (err) {
    console.error("editAddedIncome error:", err);
    return res.status(500).json({ message: "Failed to edit income" });
  }
};