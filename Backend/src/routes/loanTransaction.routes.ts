import { Router } from "express";
import { addLoanTransaction } from "../controllers/loanTransaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, addLoanTransaction);

export default router;
