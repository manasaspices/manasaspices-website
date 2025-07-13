// File: /app/api/order-details/route.js or route.ts
import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Order from "@/models/order";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
    }

    const order = await Order.findOne({ orderId });
    console.log(order);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Only return the safe, necessary details
    return NextResponse.json(
      {
        orderId: order.orderId,
        paymentId: order.paymentId,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching order details:", error);
    return NextResponse.json({ message: "Failed to fetch order details" }, { status: 500 });
  }
}
