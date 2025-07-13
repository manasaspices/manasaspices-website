"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import ProductsScroll from "@/components/ProductsScroll";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, setCart } = useCart(); 

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="min-h-screen bg-gray-100 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-manasa-green font-museo border-b-4 border-black inline-block mb-8 lg:mb-12 px-2">
          SHOPPING CART
        </h1>
        {/* Empty cart */}
        {cart.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-lg text-gray-700 mb-4">Your Cart is empty.</p>
            <Link href="/products" className="text-blue-600 hover:underline font-medium">
              Shop here
            </Link>
          </div>
        ) : (
          <>
            {/* Cart list */}
            <ul className="space-y-6">
              {cart.map((item) => (
                <li
                  key={`${item._id}-${item.netwt}`}
                  className="bg-white p-4 rounded-lg shadow-sm border flex flex-col sm:flex-row justify-between gap-4"
                >
                  <div className="flex gap-4">
                    <Link href={`/products/${item.url}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded"
                      />
                    </Link>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-semibold">{item.name} ({item.netwt})</h2>
                        <p className="text-gray-700 mt-1">₹{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => decreaseQuantity(item._id, item.netwt)}
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 bg-gray-100 border-y border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item._id, item.netwt)}
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-2">
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id, item.netwt)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {/* Subtotal */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-center">
              <p className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
                Subtotal ({cart.length} item{cart.length > 1 ? "s" : ""}):{" "}
                <span className="text-green-700">₹{totalAmount.toFixed(2)}</span>
              </p>
              <Link
                href="/checkout"
                className="w-full sm:w-auto bg-manasa-green text-white text-center px-6 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
        {/* Scroll suggestions */}
        {cart.length > 0 && (
          <div className="mt-12 space-y-8">
            <ProductsScroll category="spices" className="z-10" />
            <ProductsScroll category="pickles" className="z-10" />
          </div>
        )}
      </div>
    </section>
  );
};
export default Cart;
