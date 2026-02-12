import { Router } from "express";
import {
  getIncomeSummary,
  setSalary,
  addIncome,
  salaryCredited,
} from "../controllers/income.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getIncomeSummary);
router.post("/salary", authMiddleware, setSalary);
router.post("/add", authMiddleware, addIncome);
router.post("/salarycredited", authMiddleware, salaryCredited);

export default router;
