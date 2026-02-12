import { Request, Response } from "express";
import Loan from "../models/Loan.model";
import LoanTransaction from "../models/LoanTransaction.model";
import Income from "../models/Income.model";
import Savings from "../models/Savings.model";

/* ===== ADD PAYMENT / INTEREST ===== */
export const addLoanTransaction = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { loanId, principal, interest, type } = req.body;

  const loan = await Loan.findById(loanId);
  if (!loan) return res.status(404).json({ message: "Loan not found" });

  await LoanTransaction.create({
    userId,
    loanId,
    principal,
    interest,
    type,
  });

  // Reduce outstanding loan
  loan.amount -= principal;
  if (loan.amount <= 0) {
    loan.amount = 0;
    loan.status = "closed";
  }
  await loan.save();

  // Income update (loan given repayment OR interest)
  if (loan.type === "given") {
    await Income.create({
      userId,
      source: "Loan Repayment",
      amount: principal + interest,
    });
  }

  // Loan taken payment reduces income
  if (loan.type === "taken") {
    await Income.create({
      userId,
      source: "Loan EMI Payment",
      amount: -(principal + interest),
    });
  }

  res.status(201).json({ message: "Transaction added successfully" });
};
