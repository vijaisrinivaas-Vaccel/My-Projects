import { Router } from "express";
import {
  getIncomeSummary,
  setSalary,
  addIncome,
  salaryCredited,
  deleteAddedIncome,
  updateAddedIncome,
} from "../controllers/income.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getIncomeSummary);
router.post("/salary", authMiddleware, setSalary);
router.post("/add", authMiddleware, addIncome);
router.post("/salarycredited", authMiddleware, salaryCredited);
router.put("/update/:id", authMiddleware, updateAddedIncome);
router.delete("/delete/:id", authMiddleware, deleteAddedIncome);


export default router;
