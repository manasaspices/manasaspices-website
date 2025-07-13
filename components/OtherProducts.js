'use client'

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const OtherProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async (retryCount = 3) => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (error) {
        setError('Unable to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <section className="relative my-32">
            <div className="mx-10 lg:mx-20 p-8">
                <h1
                    className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-manasa-green p-2 font-museo inline-block border-b-2 sm:border-b-4 lg:border-b-6 border-black`}
                >
                    OTHER PRODUCTS
                </h1>
            </div>

            <div className="grid mx-6 lg:mx-10 p-2 lg:p-4 grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {products.filter((item) => item.category === "oils").map((product) => (
                    <ProductCard key={product._id} item={product} />
                ))}
            </div>
        </section>
    );
};

export default OtherProducts;
