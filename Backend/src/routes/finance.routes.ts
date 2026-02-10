import { Router } from "express";
import { addLoan, getLoans } from "../controllers/finance.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/loans", authMiddleware, getLoans);
router.post("/loans", authMiddleware, addLoan);

export default router;
