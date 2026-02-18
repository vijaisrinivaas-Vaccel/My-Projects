import mongoose from "mongoose";

const currentBalanceSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
    },
  currentBalance: { 
    type: Number,
    default: 0 
    },
  lastIncomeAddedMonth: {
    type: String,
  },
    },
    { timestamps: true }
);

currentBalanceSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model("CurrentBalance", currentBalanceSchema, "CurrentBalances");
