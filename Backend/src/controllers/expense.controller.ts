import { Request, Response } from "express";
import Expense from "../models/Expense.model";
import CurrentBalance from "../models/CurrentBalance.model";

export const addExpense = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // from JWT middleware
    const { subject, shopName, amount, category, date, description } = req.body;

    const expense = await Expense.create({
      userId,
      subject,
      shopName,
      amount,
      category,
      date,
      description,
    });

    await CurrentBalance.findOneAndUpdate(
      { userId },
      { $inc: { currentBalance: -amount } },
      { new: true }
    );
    res.status(201).json(expense);
  } catch (err) { 
    res.status(500).json({ message: "Error adding expense" });
  }
};

export const getMyExpenses = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });

    

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const expenseId = req.params.id;
    const expense = await Expense.findOneAndDelete({ _id: expenseId, userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }     
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting expense" });
  } 
};

export const editAddedExpense = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const expenseId = req.params.id;

    const { subject, shopName, amount, category, date, description } = req.body;
    const numericAmount = Number(amount);

    if ( !subject || !shopName || isNaN(numericAmount) || numericAmount <= 0 || !category || !date ) {
      return res.status(400).json({ message: "Invalid expense data" });
    }

    // 1. Find existing expense FIRST (before update)
    const expense = await Expense.findOne({ _id: expenseId, userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // 2. Calculate difference (NEW - OLD)
    const amountDifference = numericAmount - (expense.amount || 0);

    // 3. Update expense
    expense.subject = subject;
    expense.shopName = shopName;
    expense.amount = numericAmount;
    expense.category = category;
    expense.date = date;
    expense.description = description;
    await expense.save();

    // 4. Update current balance properly
    // For expense → balance decreases
    await CurrentBalance.findOneAndUpdate(
      { userId },
      { $inc: { currentBalance: -amountDifference } },
      { new: true }
    );

    return res.json({
      message: "Expense updated successfully",
      expense,
    });

  } catch (err) {
    console.error("editAddedExpense error:", err);
    return res.status(500).json({ message: "Error updating expense" });
  }
};




export const deleteAddedExpense = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const expenseId = req.params.id;
    const expenseAmount = await Expense.findOne({ _id: expenseId, userId }).select("amount");

    if (!expenseAmount) {
      return res.status(404).json({ message: "Expense not found" });
    }
    const expense = await Expense.findOneAndDelete({ _id: expenseId, userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });

    await CurrentBalance.findOneAndUpdate(
      { userId },
      { $inc: { currentBalance: expenseAmount.amount } },
      { new: true }
    );
  } catch (err) {
    res.status(500).json({ message: "Error deleting expense" });
  }
};