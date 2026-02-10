import { Router } from "express";
import {
  getIncomeSummary,
  setSalary,
  addIncome,
} from "../controllers/income.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getIncomeSummary);
router.post("/salary", authMiddleware, setSalary);
router.post("/add", authMiddleware, addIncome);

export default router;
