import { Router } from "express";
import {
  addSavingsTransaction,
  getSavingsSummary,
  getSavingsTransactions,
} from "../controllers/savings.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, addSavingsTransaction);
router.get("/", authMiddleware, getSavingsTransactions);
router.get("/summary", authMiddleware, getSavingsSummary);

export default router;
