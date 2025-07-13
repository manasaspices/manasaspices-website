"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

const Profile = () => {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // Fetch user's address from database
  useEffect(() => {
    if (session?.user) {
      fetch(`/api/user/address?email=${encodeURIComponent(session.user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.address) setAddress(data.address);
        });
    }
  }, [session]);

  const handleSaveAddress = async () => {
    const res = await fetch("/api/user/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email, address }),
    });

    if (res.ok) {
      setIsEditing(false);
    } else {
      alert("Failed to save address.");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading your account...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">
          Please sign in to access your account.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-16 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-manasa-green font-museo p-2 inline-block border-b-2 sm:border-b-4 lg:border-b-6 border-black mb-8 lg:mb-12">
          YOUR ACCOUNT
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation (Amazon-style options) */}
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
            {/* User Info Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Name:</strong> {session.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {session.user.email}
                </p>
                {session.user.phone && (
                  <p>
                    <strong>Phone:</strong> {session.user.phone}
                  </p>
                )}
                <button
                  className="mt-2 text-blue-600 hover:underline"
                  onClick={() => alert("Edit clicked")}
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Delivery Address Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Default Delivery Address</h2>
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="State"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Zip Code"
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Country"
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={handleSaveAddress}
                      className="bg-manasa-green text-gray-900 px-4 py-2 rounded-md hover:bg-green-900 transition-colors"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-gray-700">
                  <p>{address.street || "Street not set"}</p>
                  <p>
                    {address.city || "City not set"}, {address.state || "State not set"}{" "}
                    {address.zip || "Zip not set"}
                  </p>
                  <p>{address.country || "Country not set"}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-2 text-blue-600 hover:underline"
                  >
                    Edit or Add Address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;