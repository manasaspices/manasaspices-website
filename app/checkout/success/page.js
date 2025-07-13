"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

const CheckoutSuccess = () => {
  const router = useRouter();
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      router.push("/checkout/failure");
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order-details?orderId=${orderId}`);
        const data = await res.json();

        if (data.status !== "captured") {
          router.push(`/checkout/failure?orderId=${orderId}`);
        } else {
          setOrderData(data);
          clearCart();
          localStorage.removeItem("cart");
        }
      } catch (error) {
        router.push("/checkout/failure");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading || !orderData) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 text-center w-full sm:w-96">
        <h1 className="text-3xl sm:text-4xl font-semibold text-green-600 mb-6">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Thank you for your purchase. Your order is confirmed! Our team will contact you shortly with updates.        </p>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Order Details</h2>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Order ID:</span> {orderData.orderId}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Payment ID:</span> {orderData.paymentId}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Total Amount:</span> ₹{orderData.totalAmount}
          </p>
          <p>
            <span className="font-semibold"><a href = "/contact">Contact us </a> for further assistance with your order!!  </span>
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={() => router.push("/")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckoutSuccessWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccess />
    </Suspense>
  );
};

export default CheckoutSuccessWithSuspense;
