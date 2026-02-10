import { Router } from "express";
import { register, login, getMe,getMyExpenses } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.get("/", authMiddleware, getMyExpenses);

export default router;
