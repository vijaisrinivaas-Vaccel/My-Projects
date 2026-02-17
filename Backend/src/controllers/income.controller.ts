import { Request, Response } from "express";
import Salary from "../models/Salary.model";
import Income from "../models/Income.model";

/* ================= GET INCOME SUMMARY ================= */
export const getIncomeSummary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const now = new Date();
    const month = now.getMonth();       // 0–11
    const year = now.getFullYear();

    // ✅ get CURRENT month salary only
    const salaryDoc = await Salary.findOne({ userId, month, year });

    const otherIncome = await Income.find({
      userId,
      source: { $ne: "Monthly Salary" },
    }).sort({ createdAt: -1 });


    const salaryAmount = salaryDoc?.amount || 0;

    const otherTotal = otherIncome.reduce(
      (sum, inc) => sum + (inc.amount || 0),
      0
    );

    res.json({
      salary: salaryAmount,
      isCredited: salaryDoc?.isCredited ?? false, // 🔥 important for UI
      otherIncome,
      totalIncome: salaryAmount + otherTotal,
    });
  } catch (err) {
    console.error("❌ getIncomeSummary error:", err);
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

    /* ✅ Mark credited */
    salary.isCredited = true;
    salary.creditedAt = new Date();
    await salary.save();

    /* 💸 Add to income */
    await Income.create({
      userId,
      source: "Monthly Salary",
      amount: salary.amount,
    });

    res.json({ message: "Salary credited successfully", salary });
  } catch (error) {
    res.status(500).json({
      message: "Error crediting salary",
      error,
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

export const balanceAmount = async (req: Request, res: Response) => {
try {
  const userId = (req as any).user.id;
  const monthlyIncome = await Salary.findOne({ userId }).sort({ createdAt: -1 });

}catch (err) {
  console.error("❌ balanceAmount error:", err);
  res.status(500).json({ message: "Failed to fetch balance amount" });
}

};
