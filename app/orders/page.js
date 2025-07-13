"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

const Orders = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null); // Track selected order

  useEffect(() => {
    if (session?.user) {
      fetch(`/api/user/orders?userId=${encodeURIComponent(session.user.id)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.orders) {
            setOrders(data.orders);
          } else {
            setOrders([]);
            setError(data.message || "No orders found.");
          }
        })
        .catch(() => setError("Failed to fetch orders. Try again later."))
        .finally(() => setLoading(false));
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">
        Please{" "}
        <Link href="/auth/login" className="text-blue-600 underline hover:text-blue-800">
         Sign in
        </Link>{" "}
        to view your orders.
       </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-16 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-manasa-green font-museo p-2 inline-block border-b-2 sm:border-b-4 lg:border-b-6 border-black mb-8 lg:mb-12">
          YOUR ORDERS
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-sm p-4">
            <nav className="space-y-2">
              <Link href="/profile" className="block p-3 bg-gray-100 rounded-md font-medium text-gray-900">
                Profile
              </Link>
              <Link href="/orders" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700">
                Your Orders
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left p-3 hover:bg-gray-100 rounded-md text-red-600 font-medium"
              >
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 space-y-6">
            {loading ? (
              <div className="text-lg text-gray-600">Loading orders...</div>
            ) : orders.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Recent Orders</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-gray-100 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Orders: {order.items.map((item) => `${item.name} (${item.netwt}) x ${item.quantity}`).join(", ")}
                      </h3>
                      <p><strong>Status:</strong> {order.paymentStatus}</p>
                      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                      <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                      <button 
                        className="bg-manasa-green text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                        onClick={() => setSelectedOrder(order)} // Open modal
                      >
                        View Summary
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">No Orders Found</h2>
                <p>{error || "You haven’t placed any orders yet. Please visit our store to start shopping!"}</p>
                <Link href="/products" className="text-blue-600 hover:underline">
                  Visit Store
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p>
             <strong>Shipping Address:</strong> <br />
             <span className="font-semibold">{selectedOrder.shippingAddress.name}</span>,  
             <span className="ml-2">{selectedOrder.shippingAddress.phone}</span> <br />
             {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}-  
             {selectedOrder.shippingAddress.zip} <br />
             {selectedOrder.shippingAddress.state}, {selectedOrder.shippingAddress.country}
             </p>
            <h3 className="mt-4 font-medium">Items:</h3>
            <ul className="mt-2">
              {selectedOrder.items.map((item, index) => (
               <li key={index} className="flex items-center justify-between border-b py-2">
               <span className="w-1/2 truncate">{item.name} ({item.netwt}) x {item.quantity}</span>
               <span className="w-1/4 text-right">₹{item.price}</span>
               <span className="w-1/4 text-right font-semibold">₹{item.price * item.quantity}</span>
             </li>
              ))}
            </ul>
            <p className="mt-4"><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
            <button 
              className="mt-4 bg-manasa-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={() => setSelectedOrder(null)} // Close modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;