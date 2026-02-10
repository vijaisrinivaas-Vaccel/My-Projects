import { Request, Response } from "express";
import Savings from "../models/Savings.model";

/* ADD / WITHDRAW */
export const addSavingsTransaction = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;
    const { bank, amount, transactionType, note } = req.body;

    const transaction = await Savings.create({
      userId,
      bank,
      amount,
      transactionType,
      note,
    });

    res.status(201).json(transaction);
  } catch {
    res.status(500).json({ message: "Error saving transaction" });
  }
};

/* GET SAVINGS SUMMARY */
export const getSavingsSummary = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const transactions = await Savings.find({ userId });

    let totalSavings = 0;
    let totalWithdrawn = 0;

    transactions.forEach((t) => {
      if (t.transactionType === "add") {
        totalSavings += t.amount;
      } else {
        totalWithdrawn += t.amount;
      }
    });

    res.json({
      totalSavings,
      totalWithdrawn,
      balance: totalSavings - totalWithdrawn,
    });
  } catch {
    res.status(500).json({ message: "Error fetching summary" });
  }
};

/* GET ALL TRANSACTIONS */
export const getSavingsTransactions = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).user.id;
  const transactions = await Savings.find({ userId }).sort({
    createdAt: -1,
  });
  res.json(transactions);
};
