"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  // Fetch cart from MongoDB if logged in, otherwise use localStorage
  useEffect(() => {
    if (isLoggedIn) {
      fetch("/api/cart")
        .then((res) => res.json())
        .then((data) => setCart(data))
        .catch((err) => console.error("Error fetching cart:", err));
    } else {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, [isLoggedIn]);

  // Save to localStorage if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoggedIn]);

  const addToCart = async (item, selectedPrice, selectedQuantity) => {
    const product = {
      _id: item._id,
      url: item.url,
      name: item.name,
      price: selectedPrice,
      image: item.thumbnail_img,
      netwt: selectedQuantity,
      action: "increase",
    };
    console.log("hi");
    console.log(product);

    if (isLoggedIn) {
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ item: product }),
        });
        const data = await res.json();
        setCart(data);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) => cartItem._id === item._id && cartItem.netwt === selectedQuantity
        );

        if (existingItem) {
          return prevCart.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        }
        return [...prevCart, { ...product, price: selectedPrice, quantity: 1 }];
      });
    }
  };

  const increaseQuantity = (id, selectedQuantity, selectedPrice) => {
    if (isLoggedIn) {
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: { _id: id, netwt: selectedQuantity, price: selectedPrice, action: "increase" },
        }),
      })
        .then((res) => res.json())
        .then((data) => setCart(data))
        .catch((err) => console.error("Error updating cart:", err));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === id && item.netwt === selectedQuantity
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        )
      );
    }
  };

  const decreaseQuantity = (id, selectedQuantity, selectedPrice) => {
    if (isLoggedIn) {
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: { _id: id, netwt: selectedQuantity, price: selectedPrice, action: "decrease" },
        }),
      })
        .then((res) => res.json())
        .then((data) => setCart(data))
        .catch((err) => console.error("Error updating cart:", err));
    } else {
      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item._id === id && item.netwt === selectedQuantity
              ? { ...item, quantity: Math.max((item.quantity || 0) - 1, 0) }
              : item
          )
          .filter((item) => item.quantity > 0) 
      );
    }
  };

  const removeFromCart = async (id, selectedQuantity) => {
    if (isLoggedIn) {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ item: { _id: id, netwt: selectedQuantity, action: "remove" } }),
        });
        setCart((prevCart) =>
          prevCart.filter((item) => !(item._id === id && item.netwt === selectedQuantity))
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    } else {
      setCart((prevCart) =>
        prevCart.filter((item) => !(item._id === id && item.netwt === selectedQuantity))
      );
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  
  const clearCart = async () => {
    if (isLoggedIn) {
      try {
        await fetch("/api/cart", {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, setCart,  addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
