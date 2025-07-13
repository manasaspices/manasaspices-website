import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Order from "@/models/order";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const orders = await Order.find({ userId, status:'captured' }).sort({ createdAt: -1 });
    // console.log(orders);
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
  }
}
