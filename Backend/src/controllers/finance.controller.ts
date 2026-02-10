import Loan from "../models/Loan.model";
import { Request, Response } from "express";

export const getLoans = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { type } = req.query; // "taken" or "given"

  const filter: any = { userId };
  if (type) filter.type = type;

  const loans = await Loan.find(filter).sort({ createdAt: -1 });
  res.json(loans);
};

export const addLoan = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const loan = await Loan.create({
    ...req.body,
    userId,
  });

  res.status(201).json(loan);
};
