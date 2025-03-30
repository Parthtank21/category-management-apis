import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "test") return;
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
