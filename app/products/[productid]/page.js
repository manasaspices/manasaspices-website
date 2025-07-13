'use client';
import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Accordion from "./components/Accordion";
import ProductsScroll from "@/components/ProductsScroll";
import ChooseUs from "@/components/ChooseUs";

const ProductPage = ({ params }) => {
  const { productid } = React.use(params);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
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

  const product = products.find((p) => p.url === productid);

  if (!product) {
    return (
      <main className="text-center py-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">Product not found</h1>
      </main>
    );
  }

  return (
    <main className="px-2 sm:px-4 md:px-8 lg:px-20 xl:px-30 2xl:px-40 py-20 sm:py-14 md:py-20">
      <Hero product={product} />
      <Accordion products={product} />
      <ChooseUs />
      <ProductsScroll category={product.category} />
    </main>
  );
};

export default ProductPage;
