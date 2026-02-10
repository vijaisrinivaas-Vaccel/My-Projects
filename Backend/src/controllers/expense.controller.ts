import { Request, Response } from "express";
import Expense from "../models/Expense.model";

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