import { NextResponse } from "next/server";

export async function GET() {
  console.log("DEBUG: process.env.MONGODB_URI =", process.env.MONGODB_URI);
  return NextResponse.json({
    MONGODB_URI: process.env.MONGODB_URI ? "TERDETEKSI ✅" : "TIDAK ADA ❌",
  });
}
