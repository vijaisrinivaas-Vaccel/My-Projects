import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Salary", salarySchema);
