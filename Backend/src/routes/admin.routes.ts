import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
} from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/auth.middleware";

const router = Router();

router.get("/users", authMiddleware, adminOnly, getAllUsers);
router.post("/users", authMiddleware, adminOnly, createUser);
router.delete("/users/:id", authMiddleware, adminOnly, deleteUser);

export default router;
