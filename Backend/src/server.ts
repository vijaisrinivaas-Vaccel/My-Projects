import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import "./cron/salaryReset.cron";
import { connectDB } from "./config/db";

import authRoutes from "./routes/auth.routes";
import expenseRoutes from "./routes/expense.routes";
import adminRoutes from "./routes/admin.routes";
import financeRoutes from "./routes/finance.routes";
import savingsRoutes from "./routes/savings.routes";
import income from "./routes/income.routes";
import loanTransactionRoutes from "./routes/loanTransaction.routes";
import tripRoutes from "./routes/trips.routes";


dotenv.config({ path: path.resolve(__dirname, "../config.env") });

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// mount the router
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/savings", savingsRoutes);
app.use("/api/income", income);
app.use("/api/loan-transactions", loanTransactionRoutes);
app.use("/api/trips", tripRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Expense Tracker API" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on ${process.env.PORT || 5000}`);
});
