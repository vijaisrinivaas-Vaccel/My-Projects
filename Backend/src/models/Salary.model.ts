import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    month: {
      type: Number, // 0 - 11
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    isCredited: {
      type: Boolean,
      default: false,
    },

    creditedAt: Date,
  },
  { timestamps: true }
);

/* 🔒 Prevent duplicate salary per month */
salarySchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });


export default mongoose.model("Salary", salarySchema);
