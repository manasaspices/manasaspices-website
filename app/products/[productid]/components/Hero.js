import { useCart } from "@/context/CartContext";
import ProductImages from "./ProductImages";
import { useState } from "react";

const Hero = ({ product }) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const [selectedQuantity, setSelectedQuantity] = useState(
    cart.find((cartItem) => cartItem._id === product._id)?.netwt || product.quantity[0]
  );
  
  const selectedIndex = product.quantity.indexOf(selectedQuantity);
  const selectedPrice = selectedIndex !== -1 ? product.price[selectedIndex] : product.price[0];
  const selectedmrp = selectedIndex !== -1 ? product.mrp[selectedIndex] : product.mrp[0];
  const selectedoff = selectedIndex !== -1 ? product.off[selectedIndex] : product.off[0];
  const cartItem = cart.find((cartItem) => cartItem._id === product._id && cartItem.netwt === selectedQuantity);
  const inCart = Boolean(cartItem);
  
  return (
    <section className="my-10 w-screen max-w-full px-4 sm:px-6 md:px-10 md:p-20 h-auto md:h-[600px] border-4 flex flex-col md:flex-row items-center justify-center">
      {/* Product Images */}
      <div className="w-full md:w-2/5 m-3 md:m-5">
        <ProductImages image_list={product.imgs} />
      </div>
      {/* Text Content */}
      <div className="w-full md:w-3/5 space-y-4 sm:space-y-5 m-3 md:m-5 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{product.name}</h1>
   <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-center md:justify-start gap-1 sm:gap-2">
  <span className="line-through  text-gray-500 text-xl sm:text-xl"> MRP: ₹{selectedmrp}</span>
  <h2 className="max-w-40 py-1.5 px-3 text-center justi text-md sm:text-md md:text-md bg-manasa-green text-white rounded-md"> Limited time offer </h2>
</div>
        <h3 className="text-lg sm:text-xl md:text-2xl"><span className="text-xl text-bold font-thin text-red-600">
      -{selectedoff}%
    </span>  ₹{selectedPrice} <span className="text-gray-500 text-md sm:text-xl">(₹{selectedPrice}/{selectedQuantity})</span></h3>
        <h5 className="text-base sm:text-lg md:text-xl">Availability: In Stock</h5>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed">{product.prod_desc}</p>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed">
          <strong>100% NATURAL & PESTICIDE FREE:</strong> Our {product.name} is sourced from farms that do not use any chemicals, pesticides, or insecticides.
        </p>

        {/* Quantity Selection & Buttons */}
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
          <select
            className="border border-gray-400 text-lg rounded-lg px-4 py-2"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(e.target.value)}
          >
            {product.quantity.map((qty, index) => (
              <option key={index} value={qty}>
                {qty}
              </option>
            ))}
          </select>

          {inCart ? (
            <div className="flex items-center my-8 text-lg">
              <button onClick={() => decreaseQuantity(product._id,selectedQuantity)} className="w-[40px] bg-gray-300 px-3 py-2 rounded-l-lg hover:bg-gray-400">-</button>
              <span className="w-[40px] text-center px-4 py-2 bg-white border-t border-b">{cartItem.quantity}</span>
              <button onClick={() => increaseQuantity(product._id,selectedQuantity)} className="w-[40px] bg-gray-300 px-3 py-2 rounded-r-lg hover:bg-gray-400">+</button>
            </div>
          ) : (
            <button onClick={() => addToCart(product, selectedPrice, selectedQuantity)} className="w-full max-w-[180px] mx-auto py-2 px-4 text-sm sm:text-base md:text-lg bg-manasa-green text-white rounded-lg hover:bg-opacity-85 hover:scale-105 transition-transform duration-200">
              Add to Cart
            </button>
          )} 
        </div>
      </div>
    </section>
  );
};

export default Hero;