import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017";

if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined");
}
mongoose.set("strictQuery", false);
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(mongoUri);
}

export { default as Game } from "./models/game";
