//src/lib/db.ts

"use server";

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined in .env");

let isConnected = false;

export async function dbConnect() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    throw new Error("MongoDB connection failed");
  }
}
