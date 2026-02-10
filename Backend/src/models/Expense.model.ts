import mongoose, { Schema, Document } from "mongoose";

export interface ExpenseDocument extends Document {
  userId: mongoose.Types.ObjectId;
  subject: string;
  shopName: string;
  amount: number;
  category: "Travel" | "Food" | "Accommodation" | "Office Supplies";
  date: Date;
  description?: string;
  addToReport: boolean;
  receiptUrl?: string; // uploaded file path / cloud URL
}

const expenseSchema = new Schema<ExpenseDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: ["Travel", "Food", "Accommodation", "Office Supplies"],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    addToReport: {
      type: Boolean,
      default: true,
    },

    receiptUrl: {
      type: String, // later: S3 / Cloudinary / local path
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ExpenseDocument>("Expense", expenseSchema);
