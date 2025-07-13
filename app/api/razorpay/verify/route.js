import Razorpay from "razorpay";
import connectDB from "@/utils/db";
import Order from "@/models/order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendOrderConfirmationEmail } from "@/utils/salesmail";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const { payment_id, order_id, amount, cart, total, address } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Fetch payment data from Razorpay
    const paymentData = await razorpay.payments.fetch(payment_id);
    console.log(paymentData);

    // Verify payment data and proceed with saving the order
    if (paymentData) {
      await connectDB();

      // Saving the order in the database
      const newOrder = new Order({
        userId: session?.user?.id || null,
        userType: session?.user?.id ? "Registered" : "Guest",
        items: cart,
        totalAmount: total,
        shippingAddress: address,
        paymentStatus: "Paid",
        paymentId: payment_id,
        orderId: order_id,
        captured: paymentData.captured,
        status: paymentData.status,
      });

      console.log("Order data:", newOrder);
      await newOrder.save();

      // If payment is captured, send email to admin
      if (paymentData.status === "captured") {
        console.log("Order saved, now sending email to admin");
        
        // Ensure address is an object
        const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

        // Send order confirmation email to admin
        await sendOrderConfirmationEmail({
          to: ["enquiry@manasaspices.com", "sales@manasaspices.com", session?.user?.email].filter(Boolean),
          name: session?.user?.name || "Guest",
          paymentId: payment_id,
          orderId: order_id,
          total,
          address: parsedAddress,
          items: cart,
        });
      }

      return new Response(JSON.stringify({ success: true, message: "Payment verified and order saved", order: newOrder }), { status: 201 });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Payment verification failed", payment: paymentData }), { status: 400 });
    }
  } catch (error) {
    console.error("Error verifying payment and saving order:", error);
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}
