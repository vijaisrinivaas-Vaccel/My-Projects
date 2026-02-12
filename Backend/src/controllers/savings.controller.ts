import { Request, Response } from "express";
import Savings from "../models/Savings.model";

/* ================= ADD / WITHDRAW ================= */
export const addSavingsTransaction = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;
    const { bank, amount, transactionType, note } = req.body;

    // ✅ Validation
    if (!bank || !amount || !transactionType) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!["add", "withdraw"].includes(transactionType)) {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be positive" });
    }

    // ✅ Prevent overdraft
    let balance = 0; // declare outside

if (transactionType === "withdraw") {
  const result = await Savings.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        balance: {
          $sum: {
            $cond: [
              { $eq: ["$transactionType", "add"] },
              "$amount",
              { $multiply: ["$amount", -1] }
            ]
          }
        }
      }
    }
  ]);

  balance = result[0]?.balance || 0;

  if (amount > balance) {
    return res
      .status(400)
      .json({ message: "Insufficient savings balance" });
  }
}


    const transaction = await Savings.create({
      userId,
      bank,
      amount,
      transactionType,
      note,
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error("❌ Savings error:", err);
    res.status(500).json({ message: "Error saving transaction" });
  }
};

/* ================= SUMMARY ================= */
export const getSavingsSummary = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;
    const transactions = await Savings.find({ userId });

    let totalAdded = 0;
    let totalWithdrawn = 0;

    transactions.forEach((t) => {
      if (t.transactionType === "add") {
        totalAdded += t.amount;
      } else {
        totalWithdrawn += t.amount;
      }
    });

    res.json({
      totalAdded,
      totalWithdrawn,
      balance: totalAdded - totalWithdrawn,
    });
  } catch (err) {
    console.error("❌ Summary error:", err);
    res.status(500).json({ message: "Error fetching summary" });
  }
};

/* ================= HISTORY ================= */
export const getSavingsTransactions = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const transactions = await Savings.find({ userId }).sort({
      createdAt: -1,
    });

    res.json(transactions);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};
