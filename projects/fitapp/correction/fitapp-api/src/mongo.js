import mongoose from "mongoose";

export const client = await mongoose.connect(
  "mongodb://localhost:27017/fitomapp"
);
