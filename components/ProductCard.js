"use client";

import Link from "next/link";
import { MuseoModerno } from "next/font/google";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const museo = MuseoModerno({ subsets: ["latin"] });

const ProductCard = ({ item }) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(item.quantity[0]);

  const cartItem = cart.find(
    (cartItem) => cartItem._id === item._id && cartItem.netwt === selectedQuantity
  );
  const inCart = Boolean(cartItem);

  const startImageCycle = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === item.imgs.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000);
      setIntervalId(id);
    }
  };

  const stopImageCycle = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      stopImageCycle();
    }
    return () => {
      stopImageCycle();
    };
  }, [isHovered]);

  const selectedIndex = item.quantity.indexOf(selectedQuantity);
  const selectedPrice = selectedIndex !== -1 ? item.price[selectedIndex] : item.price[0];

  const handleQuantityChange = (e) => {
    setSelectedQuantity(e.target.value);
  };

  return (
    <div
      className="relative flex flex-col justify-between rounded-xl shadow-lg w-[170px] md:w-[220px] lg:w-[270px]"
      onMouseEnter={() => {
        setIsHovered(true);
        startImageCycle();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        stopImageCycle();
        setCurrentImageIndex(0);
      }}
    >
      <Link href={`/products/${item.url}`}>
        <div className="mx-auto shadow-xl flex items-center justify-center w-[130px] h-[130px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] rounded-xl relative">
          <img
            src={item.imgs[currentImageIndex]}
            alt={item.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <h1
          className={`text-xl sm:text-2xl lg:text-3xl font-medium my-4 text-center ${museo.className}`}
        >
          {item.name.toLowerCase()}
        </h1>
      </Link>

      <div className="text-center">
        {/* Dropdown for Quantity */}
        {item.quantity && item.quantity.length > 0 ? (
          <select
            value={selectedQuantity}
            onChange={handleQuantityChange}
            className="border-2 border-gray-300 rounded-lg px-2 py-1 mb-2 lg:text-lg"
          >
            {item.quantity.map((qty, index) => (
              <option key={index} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-lg font-semibold text-gray-700">No quantity options available</p>
        )}
        {/* Display Price based on Selected Quantity */}
        <p className="text-lg md:text-xl font-semibold text-gray-700">
          ₹{selectedPrice}
        </p>
      </div>

      {inCart ? (
        <div className="flex items-center justify-center my-8">
          <button
            onClick={() => decreaseQuantity(item._id, selectedQuantity)}
            className="bg-gray-300 px-3 py-1 rounded-l-lg hover:bg-gray-400"
          >
            -
          </button>
          <span className="px-4 py-1 bg-white border-t border-b">{cartItem.quantity}</span>
          <button
            onClick={() => increaseQuantity(item._id, selectedQuantity)}
            className="bg-gray-300 px-3 py-1 rounded-r-lg hover:bg-gray-400"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() =>
            addToCart(item, selectedPrice, selectedQuantity)
          }
          className="my-8 w-[120px] lg:w-[200px] mx-auto py-2 px-4 text-sm sm:text-base md:text-lg bg-manasa-green text-white rounded-lg hover:bg-opacity-85 hover:scale-105 transition-transform duration-200"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
