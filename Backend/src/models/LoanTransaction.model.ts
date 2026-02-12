import mongoose from "mongoose";

const loanTransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },

    type: {
      type: String,
      enum: ["disbursement", "payment", "interest"],
      required: true,
    },

    principal: { type: Number, default: 0 },
    interest: { type: Number, default: 0 },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("LoanTransaction", loanTransactionSchema);
