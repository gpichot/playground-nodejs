import mongoose from "mongoose";

console.log("Connecting to MongoDB");
export const client = await mongoose.connect(
  "mongodb://localhost:27017/fitomapp",
  {
    serverSelectionTimeoutMS: 5000,
  }
);
console.log("Connected to MongoDB");
