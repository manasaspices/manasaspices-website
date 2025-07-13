import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();
    const user = await mongoose.connection.db.collection("users").findOne({ email });

    if (!user || !user.address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json({ address: user.address }, { status: 200 });
  } catch (error) {
    console.error("Error fetching address:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { email, address } = await req.json();

    if (!email || !address) {
      return NextResponse.json({ error: "Email and address are required" }, { status: 400 });
    }

    await connectDB();
    const result = await mongoose.connection.db.collection("users").updateOne(
      { email },
      { $set: { address } },
      { upsert: true }
    );

    return NextResponse.json({ message: "Address updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating address:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
