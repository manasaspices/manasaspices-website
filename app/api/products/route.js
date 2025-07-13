import connectDB from "@/utils/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    const products = await mongoose.connection.db.collection("products").find({}).toArray();
    return new Response(JSON.stringify(products), {status: 200, headers: { "Content-Type": "application/json" },});
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }),{ status: 500, headers: { "Content-Type": "application/json" },});
  }
}
