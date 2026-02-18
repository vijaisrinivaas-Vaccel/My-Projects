import CurrentBalance from "../models/CurrentBalance.model";
import { Request, Response } from "express";

const getCurrentBalance = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;    
    let balanceDoc = await CurrentBalance.findOne({ userId });

    if (!balanceDoc) {
        balanceDoc = await CurrentBalance.create({
        userId,
        currentBalance: 0,
      });
    }   
    res.json({ currentBalance: balanceDoc.currentBalance });
    } catch (err) {
    console.error("getCurrentBalance error:", err);
    res.status(500).json({ message: "Failed to fetch current balance" });
  } 
};