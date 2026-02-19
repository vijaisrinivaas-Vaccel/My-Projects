import { Router } from "express";
import {
  addExpense,
  getMyExpenses,
  deleteExpense,
  editAddedExpense,
  deleteAddedExpense,
} from "../controllers/expense.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/addExpense", authMiddleware, (req, res, next) => {
  console.log("🔥 /addExpense route hit");
  next();
}, addExpense);
router.get("/", authMiddleware, getMyExpenses);
router.delete("/:id", authMiddleware, deleteExpense);
router.put("/edit/:id", authMiddleware, editAddedExpense);
router.delete("/delete/:id", authMiddleware, deleteAddedExpense);

export default router;