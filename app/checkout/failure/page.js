"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

const CheckoutFailure = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  const [orderData, setOrderData] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setStatusMessage("Order ID missing. Unable to fetch order details.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order-details?orderId=${orderId}`);
        const data = await res.json();

        if (data.status === "captured") {
          router.push(`/checkout/success?orderId=${orderId}`);
        } else {
          setOrderData(data);
          switch (data.status) {
            case "created":
              setStatusMessage(
                "Your payment was created but was not authorized. Contact us for any queries!"
              );
              break;
            case "authorized":
              setStatusMessage(
                "Your payment was authorized but not captured. If the amount was debited, it will be refunded."
              );
              break;
            case "refunded":
              setStatusMessage("Your payment has been refunded. Contact us for more info.");
              break;
            case "failed":
              setStatusMessage("Payment failed. Please try again or contact support.");
              break;
            default:
              setStatusMessage(
                "An unknown error occurred. If money was debited, please contact support."
              );
          }
        }
      } catch (error) {
        setStatusMessage("Error fetching order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 text-center w-full sm:w-96">
        <h1 className="text-3xl sm:text-4xl font-semibold text-red-600 mb-6">
          Payment Failed!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          We encountered an issue with your payment. Please review the status below.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Payment Status</h2>
          <p className="text-gray-600 mb-4">{statusMessage}</p>
          {orderData && (
            <div className="text-left">
              <p className="text-gray-800 font-medium">
                Order ID: <span className="text-gray-600">{orderData.orderId}</span>
              </p>
              <p className="text-gray-800 font-medium">
                Payment ID: <span className="text-gray-600">{orderData.paymentId || "N/A"}</span>
              </p>
              <p className="text-gray-800 font-medium">
                Total Amount: <span className="text-gray-600">₹{orderData.totalAmount}</span>
              </p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <button
            onClick={() => router.push("/checkout")}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300"
          >
            Back to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckoutFailureWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutFailure />
    </Suspense>
  );
};

export default CheckoutFailureWithSuspense;
