'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const ProductsScroll = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.filter((item) => item.category === category));
        setError(null);
      } catch (error) {
        setError('Unable to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  // Duplicate products for seamless scroll
  const getDuplicatedProducts = () => {
    if (products.length === 0) return [];
    // Duplicate enough to fill at least 3x viewport
    const minItems = Math.ceil((typeof window !== 'undefined' ? window.innerWidth : 1200) * 3 / 250);
    const duplication = Math.ceil(minItems / products.length);
    return Array(duplication).fill(products).flat();
  };

  // Pause/resume CSS animation
  const pauseAnimation = () => {
    if (scrollRef.current) {
      scrollRef.current.querySelector('.scroll-content').style.animationPlayState = 'paused';
    }
  };
  const resumeAnimation = () => {
    if (scrollRef.current) {
      scrollRef.current.querySelector('.scroll-content').style.animationPlayState = 'running';
    }
  };

  // Pause on manual scroll and resume after short delay
  let scrollTimeout = null;
  const handleScroll = () => {
    pauseAnimation();
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(resumeAnimation, 700);

    // Seamless loop: if user scrolls to the end, reset to start
    const container = scrollRef.current;
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 1) {
        container.scrollLeft = 0;
      }
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [products]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500 text-center text-lg">{error}</p>;

  const duplicatedProducts = getDuplicatedProducts();

  return (
    <section className="relative my-8 lg:my-20 overflow-hidden">
      <div className="mx-4 lg:mx-20 p-4">
        <h1 className="text-xl lg:text-5xl font-extrabold text-manasa-green font-museo p-2 inline-block border-b-2 sm:border-b-4 lg:border-b-6 border-black mb-8 lg:mb-12 uppercase">
          EXPLORE OUR {category}
        </h1>
      </div>
      <div
        className="scroll-container overflow-x-scroll whitespace-nowrap"
        ref={scrollRef}
        tabIndex={0}
        onMouseEnter={pauseAnimation}
        onMouseLeave={resumeAnimation}
        onTouchStart={pauseAnimation}
        onTouchEnd={resumeAnimation}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="scroll-content flex gap-5 w-max">
          {duplicatedProducts.map((product, i) => (
            <ScrollItem
              key={i}
              link={`/products/${product.url}`}
              name={product.name}
              image={product.thumbnail_img}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
        .scroll-content {
          animation: scroll-left 25s linear infinite;
          animation-play-state: running;
        }
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
};

const ScrollItem = ({ link, name, image }) => (
  <div className="relative inline-block w-[130px] h-[130px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] aspect-square rounded-xl shadow-xl bg-slate-400 flex-shrink-0">
    <Link href={link} className="relative h-full w-full flex flex-col justify-center items-center">
      <div className="absolute inset-0 w-full h-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl"
          draggable={false}
          loading="lazy"
        />
        <h1 className="absolute left-2 bottom-2 text-sm sm:text-lg md:text-xl xl:text-2xl font-medium bg-black bg-opacity-50 text-white px-2 py-1 rounded-md font-museo">
          {name}
        </h1>
      </div>
    </Link>
  </div>
);

export default ProductsScroll;
