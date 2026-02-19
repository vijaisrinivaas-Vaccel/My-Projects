import { Request, Response } from "express";
import Trip from "../models/Trip.model";
import CurrentBalance from "../models/CurrentBalance.model";

/* =========================
   ADD TRIP
========================= */
export const addTrip = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const {
      name,
      tripType, // Domestic | International
      purpose,
      transportMode, // flight | train | bus | car | bike
      tripMode, // one-way | roundtrip
      departFrom,
      destination,
      departDate,
      returnDate,
      budget,
      hotel,
    } = req.body;

    const trip = await Trip.create({
      userId,
      name,
      tripType,
      purpose,
      transportMode,
      tripMode,
      departFrom,
      destination,
      departDate,
      returnDate,
      budget,
      hotel,
    });


    await CurrentBalance.findOneAndUpdate(
      { userId },
      { $inc: { currentBalance: -budget } },
      { new: true, upsert: true }
    );

    res.status(201).json(trip);
  } catch (err) {
    console.error("addTrip error:", err);
    res.status(500).json({ message: "Error adding trip" });
  }
};


/* =========================
   GET MY TRIPS
========================= */
export const getMyTrips = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const trips = await Trip.find({ userId }).sort({ createdAt: -1 });

    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trips" });
  }
};


/* =========================
   EDIT TRIP
========================= */
export const editTrip = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const tripId = req.params.id;

    const {
      name,
      type,
      purpose,
      transportMode,
      tripType,
      departFrom,
      destination,
      departDate,
      returnDate,
      budget,
      hotel,
    } = req.body;

    if (!name || !departFrom || !destination || !departDate || !returnDate || !budget) {  
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const trip = await Trip.findOne({ _id: tripId, userId });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const budgetDiff = budget - trip.budget;

    trip.name = name; 
    
    trip.purpose = purpose;
    trip.transportMode = transportMode;
    trip.tripType = tripType;
    trip.departFrom = departFrom;
    trip.destination = destination;
    trip.departDate = departDate;
    trip.returnDate = returnDate;
    trip.budget = budget;
    trip.hotel = hotel;

    await CurrentBalance.findOneAndUpdate(
      { userId },
      { $inc: { currentBalance: -budgetDiff } },
      { new: true, upsert: true }
    );

    await trip.save();

    res.json({ message: "Trip updated successfully", trip });
  } catch (err) {
    console.error("editTrip error:", err);
    res.status(500).json({ message: "Error updating trip" });
  }
};


/* =========================
   DELETE TRIP
========================= */
export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const tripId = req.params.id;

    const trip = await Trip.findOneAndDelete({ _id: tripId, userId });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting trip" });
  }
};
