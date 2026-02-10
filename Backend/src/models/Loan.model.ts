import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["taken", "given"], required: true },
    personOrBank: String,
    amount: Number,
    interest: Number,
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Loan", loanSchema);
