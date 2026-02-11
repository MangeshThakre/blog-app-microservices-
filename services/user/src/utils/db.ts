import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;