"use client";
import { useEffect } from "react";

const RazorpayProvider = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default RazorpayProvider;
