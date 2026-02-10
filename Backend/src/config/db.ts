import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/expensetracker");
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
};
