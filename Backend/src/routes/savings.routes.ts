import { Router } from "express";
import {
  addSavingsTransaction,
  getSavingsSummary,
  getSavingsTransactions,
} from "../controllers/savings.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/addSavingData", authMiddleware, addSavingsTransaction);
router.post("/", authMiddleware, addSavingsTransaction);
router.get("/summary", authMiddleware, getSavingsSummary);
router.get("/", authMiddleware, getSavingsTransactions);


export default router;
