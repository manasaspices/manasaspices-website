'use client';
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RazorpayProvider from "@/components/RazorpayProvider";

export default function Checkout() {
  const { cart, setCart, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [address, setAddress] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India", 
  });

  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false); 
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [confirmPhone, setConfirmPhone] = useState("");
  const [confirmPhoneError, setConfirmPhoneError] = useState("");
  const [loading, setLoading] = useState(true);
  const [validationError, setValidationError] = useState(null);

    useEffect(() => {
    const validateCartWithServer = async () => {
      try {
        const res = await fetch("/api/cart/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart }),
        });
        const data = await res.json();
        console.log(data);
        console.log("Validated cart:", data.validatedCart);
        if (res.ok) {
             if (JSON.stringify(cart) !== JSON.stringify(data.validatedCart)) {
                setCart(data.validatedCart);
                 if (data.user) {
                     try {
                        const saveRes = await fetch("/api/cart", {
                        method: "PUT",
                        headers: {
                         "Content-Type": "application/json",
                            },
                        body: JSON.stringify({
                        userId: data.user.id,
                        cart: data.validatedCart,
                      }),
                    });
      if (!saveRes.ok) {
        console.error("Failed to save validated cart to DB");
      } else {
        console.log("Cart saved to DB for user:", data.user.email);
      }
    } catch (err) {
      console.error("Error saving cart to DB:", err);
    }
  }}  } else {
          setValidationError(data.message || "Cart validation failed.");
     }
      } catch (err) {
        console.error("Validation error:", err);
        setValidationError("Could not validate cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (cart.length > 0) {
      validateCartWithServer();
    } else {
      setLoading(false);
    }
  }, [cart, setCart]);

  const fetchAddressFromPincode = async (pincode) => {
    if (pincode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        if (data[0]?.Status === "Success") {
          const { PostOffice } = data[0];
          const firstPostOffice = PostOffice && PostOffice[0];
          if (firstPostOffice) {
            setAddress((prev) => ({
              ...prev,
              city: firstPostOffice.Region, 
              state: firstPostOffice.State,  
              country: "India", 
            }));
          }
        } else {
          console.error("Invalid Pincode");
        }
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    }
  };

  useEffect(() => {
    if (session?.user) {
      setAddress((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
      }));

      fetch(`/api/user/address?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.address) {
            setAddress((prev) => ({
              ...prev,
              street: data.address.street || "",
              zip: data.address.zip || "",
              country: data.address.country || "",
            }));
          }
        })
        .catch((err) => console.error("Error fetching address:", err));
    }
  }, [session]);

  useEffect(() => {
    if (address.zip) {
      fetchAddressFromPincode(address.zip);
    }
  }, [address.zip]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "confirmPhone") {
      setConfirmPhone(value);
      if (address.phone && value !== address.phone) {
        setConfirmPhoneError("Phone numbers do not match.");
      } else {
        setConfirmPhoneError("");
      }
      return;
    }
  
    setAddress({ ...address, [name]: value });
  
    if (name === "email") {
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      setEmailError(emailPattern.test(value) ? "" : "Please enter a valid email address.");
    }
  
    if (name === "phone") {
      const phonePattern = /^[6-9][0-9]{9}$/;
      setPhoneError(phonePattern.test(value) ? "" : "Please enter a valid 10-digit phone number.");
  
      // Also recheck the confirmation field
      if (confirmPhone && value !== confirmPhone) {
        setConfirmPhoneError("Phone numbers do not match.");
      } else {
        setConfirmPhoneError("");
      }
    }
  };
  

  const handlePayment = async () => {
    if (
      !address.name ||
      !address.phone ||
      !address.city ||
      !address.state ||
      !address.zip ||
      !address.country ||
      address.phone.length !== 10 ||
      //!address.email ||
      !address.street
    ) {
      alert("Please fill in all required fields properly!");
      return;
    }

    if (address.phone !== confirmPhone) {
      alert("Phone numbers do not match. Please check again.");
      return;
    }

    const orderDetails = {
      name: address.name,
      email: address.email,
      phone: address.phone,
      amount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      address,
      items: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
    };

    try {
      setIsPaymentInProgress(true); 

      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orderData.message);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Manasa Spices",
        order_id: orderData.id,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                amount: orderData.amount / 100,
                cart,
                total: orderData.amount / 100,
                address,
                paymentMode: "Online",
              }),
            });
      
            const verifyData = await verifyResponse.json();
            if (verifyData.order.status === 'captured') {
              clearCart();
              router.push(`/checkout/success?orderId=${verifyData.order.orderId}`);
              console.log(verifyData.status);      
            } else {
                //   If status is authorized,failed,refunded,created we push failure page
                 router.push(`/checkout/failure?orderId=${verifyData.order.orderId}`);
                 console.log(verifyData.status);
             }

          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed. Please try again.");
            setIsPaymentInProgress(false); 
          }
        },
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        notes: {
          order_summary: cart.map(item => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join("\n"),
        },
        theme: { color: "#045419" },
        modal: {
          ondismiss: function () {  //func to listen when rzp window gets closed by user
            setIsPaymentInProgress(false); 
          }
        }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
      setIsPaymentInProgress(false); 
    }
  };

  return (
    <section className="flex flex-col lg:flex-row items-center py-24 px-6">
      <RazorpayProvider />
      <div className="lg:w-2/3 w-full space-y-6 lg:mr-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-manasa-green font-museo p-2 inline-block border-b-2 sm:border-b-4 lg:border-b-6 border-black mb-8 lg:mb-12">CHECKOUT</h1>

        {/* Delivery Address Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Delivery Address</h2>

          <form>
            {/* Full Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name<span className="text-red-600">*</span></label>
              <input type="text" id="name" name="name" value={address.name} onChange={handleAddressChange} placeholder="Full Name" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"/>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" value={address.email} onChange={handleAddressChange} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"/>
               {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700"> Phone Number<span className="text-red-600">*</span></label>
              <input type="number" id="phone" name="phone" value={address.phone} onChange={handleAddressChange} placeholder="Phone Number" required pattern="^[6-9][0-9]{9}$" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"/>
              {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
            </div>

            {/* Confirm Phone Number */}
<div className="mb-4">
  <label htmlFor="confirmPhone" className="block text-lg font-medium text-gray-700">
    Re-enter Phone Number<span className="text-red-600">*</span>
  </label>
  <input
    type="number"
    id="confirmPhone"
    name="confirmPhone"
    value={confirmPhone}
    onChange={handleAddressChange}
    placeholder="Re-enter Phone Number"
    required
    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
  />
  {confirmPhoneError && <p className="text-red-500 text-sm mt-1">{confirmPhoneError}</p>}
</div>


            {/* Street Address */}
            <div className="mb-4">
              <label htmlFor="street" className="block text-lg font-medium text-gray-700">Address<span className="text-red-600">*</span></label>
              <input type="text" id="street" name="street" value={address.street} onChange={handleAddressChange} placeholder="Door No., floor, street/road, Area" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"/>
            </div>

            {/* ZIP Code */}
            <div className="mb-4">
              <label htmlFor="zip" className="block text-lg font-medium text-gray-700">ZIP Code<span className="text-red-600">*</span></label>
              <input type="text" id="zip" name="zip" value={address.zip} onChange={handleAddressChange} placeholder="ZIP Code" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"/>
            </div>

            {/* City, State, Country Fields */}
            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label htmlFor="city" className="block text-lg font-medium text-gray-700">City</label>
                <input type="text" id="city" name="city" value={address.city} onChange={handleAddressChange} disabled className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"/>
              </div>

              <div className="mb-4">
                <label htmlFor="state" className="block text-lg font-medium text-gray-700">State</label>
                <input type="text" id="state" name="state" value={address.state} onChange={handleAddressChange} disabled className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"/>
              </div>

              <div className="mb-4">
                <label htmlFor="country" className="block text-lg font-medium text-gray-700">Country</label>
                <input type="text" id="country" name="country" value={address.country} onChange={handleAddressChange} disabled className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"/>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Order Summary and Pay Now Button Section */}
      <div className="lg:w-1/3 w-full bg-white p-6 rounded-lg shadow-lg mt-8 lg:mt-0">
        <h2 className="text-xl text-manasa-green font-museo inline-block border-b-2 sm:border-b-4 lg:border-b-6 border-black mb-8 lg:mb-12">Order Summary</h2>
        <ul className="mt-2 text-md space-y-2">
          {cart.map((item) => (
            <li key={`${item._id}-${item.netwt}`} className="flex justify-between border-b pb-2">
              <span>{item.name} ({item.netwt}) (x{item.quantity})</span>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-bold text-lg">Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>

        {/* Checkout Button */}
        <button
          onClick={handlePayment}
          className={`mt-6 w-full py-3 rounded-md ${isPaymentInProgress ? 'bg-gray-500 cursor-not-allowed' : 'bg-manasa-green hover:bg-green-700'} text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
          disabled={isPaymentInProgress} 
        >
          {isPaymentInProgress ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </section>
  );
}
