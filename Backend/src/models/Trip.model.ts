import mongoose, { Schema, Document } from "mongoose";

export interface TripDoc extends Document {
  userId: mongoose.Types.ObjectId;

  name: string;
  tripType: "Domestic" | "International";
  purpose: string;

  transportMode: "Flight" | "Train" | "Bus" | "Car" | "Bike";
  tripMode: "One-way" | "Roundtrip";

  departFrom: string;
  destination: string;

  departDate: Date;
  returnDate?: Date;

  budget: number;

  hotel?: string;

  status: "Draft" | "Saved";

  tripStatus?: string; // 👈 virtual field
}

const TripSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    tripType: {
      type: String,
      enum: ["Domestic", "International"],
      required: true,
    },

    purpose: {
      type: String,
      required: true,
      trim: true,
    },

    transportMode: {
      type: String,
      enum: ["Flight", "Train", "Bus", "Car", "Bike"],
      required: true,
    },

    tripMode: {
      type: String,
      enum: ["One-way", "Roundtrip"],
      required: true,
    },

    departFrom: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    departDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
    },

    budget: {
      type: Number,
      required: true,
      min: 0,
    },

    hotel: String,

    status: {
      type: String,
      enum: ["Draft", "Saved"],
      default: "Saved",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },     // ✅ important
    toObject: { virtuals: true },   // ✅ important
  }
);


// 🔥 ADD THIS HERE (after schema, before export)
TripSchema.virtual("tripStatus").get(function (this: TripDoc) {
  const today = new Date();

  if (this.returnDate) {
    if (today > this.returnDate) {
      return "Trip Ended";
    }

    if (today >= this.departDate && today <= this.returnDate) {
      return "Ongoing";
    }
  }

  if (today < this.departDate) {
    return "Upcoming";
  }

  return "Ongoing";
});


export default mongoose.model<TripDoc>("Trip", TripSchema);
