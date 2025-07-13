"use client";
import { useState } from "react";

const ProductImages = ({ image_list }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = image_list;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Main Image */}
      <div className="mb-4">
        <img
          src={images[selectedImage]}
          alt={`Product ${selectedImage + 1}`}
          className="w-96 h-96 object-cover rounded-lg shadow-lg mx-auto"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-2 overflow-x-auto justify-center">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`border rounded-lg p-1 ${
              selectedImage === index
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
