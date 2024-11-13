import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "../models/userModel";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL!, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

export const fetchUsers = async () => {
  return await User.find({});
};

export const addUser = async (name: string, favoriteNumber: number) => {
  const user = new User({ name, favoriteNumber });
  return await user.save();
};
