import { Router } from "express";
import {
  addTrip,
  getMyTrips,
  editTrip,
  deleteTrip,
} from "../controllers/trip.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/add", authMiddleware, addTrip);
router.get("/", authMiddleware, getMyTrips);
router.put("/edit/:id", authMiddleware, editTrip);
router.delete("/delete/:id", authMiddleware, deleteTrip);

export default router;
