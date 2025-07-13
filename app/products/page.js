"use client";

import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (retryCount = 3) => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (error) {
      if (retryCount > 0) {
        console.log(`Retrying... attempts left: ${retryCount}`);
        fetchProducts(retryCount - 1);
      } else {
        setError("Unable to fetch products. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col">
      <Image
        src="https://files.manasaspices.com/images_hd/productImages/Group.jpg"
        layout="responsive"
        width={1600}
        height={900}
        alt="header"
        className="w-full h-auto object-contain fixed top-6 -z-10"
        priority
        style={{ objectPosition: "center top" }}
      />

      <div className="w-full bg-white mt-[250px] md:mt-[560px] lg:mt-[650px] xl:mt-[700px]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="my-4 lg:my-10 text-2xl lg:text-5xl font-extrabold text-manasa-green">
            OUR PRODUCTS
          </h1>
          <hr className="w-52 sm:w-96 md:w-100 lg:w-100 h-1 bg-black border-0 rounded mt-0" />
        </div>

        {/* Our Spices Section */}
        <section className="relative my-10">
          <div className="mx-4 sm:mx-8 lg:mx-20 p-4">
            <h1 className="my-4 lg:my-10 text-2xl lg:text-5xl text-left font-extrabold text-manasa-green">
              OUR SPICES
            </h1>
            <hr className="w-52 sm:w-96 md:w-100 lg:w-100 h-1 bg-black border-0 rounded mt-0" />
          </div>
          <div className="grid gap-4 md:gap-10 lg:gap-12 mx-6 lg:mx-10 lg:p-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {products
              .filter((item) => item.category === "spices")
              .map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
          </div>
        </section>

        {/* Our Homemade Pickles Section */}
        <section className="relative my-10">
          <div className="mx-4 sm:mx-8 lg:mx-20 p-4">
            <h1 className="my-4 lg:my-10 text-2xl lg:text-5xl text-left font-extrabold text-manasa-green">
              OUR HOMEMADE PICKLES
            </h1>
            <hr className="w-52 sm:w-96 md:w-100 lg:w-100 h-1 bg-black border-0 rounded mt-0" />
          </div>
          <div className="grid gap-8 md:gap-10 lg:gap-12 mx-6 lg:mx-10 p-2 lg:p-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {products
              .filter((item) => item.category === "pickles")
              .map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
          </div>
        </section>

        {/* Our Cold-Pressed Coconut Oil Section */}
        <section className="relative my-10">
          <div className="mx-4 sm:mx-8 lg:mx-20 p-4">
            <h1 className="my-4 lg:my-10 text-2xl lg:text-5xl text-left font-extrabold text-manasa-green">
              OUR OILS
            </h1>
            <hr className="w-52 sm:w-96 md:w-100 lg:w-100 h-1 bg-black border-0 rounded mt-0" />
          </div>
          <div className="grid gap-4 md:gap-10 lg:gap-12 mx-6 lg:mx-10 p-2 lg:p-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {products
              .filter((item) => item.category === "oils")
              .map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}