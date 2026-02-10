import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    source: String,
    amount: Number,
    date: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Income", incomeSchema);
