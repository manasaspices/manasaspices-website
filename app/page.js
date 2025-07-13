"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ProductsScroll from "@/components/ProductsScroll";
import OtherProducts from "@/components/OtherProducts";
import Unique from "@/components/Unique";

export default function Home() {
  const [sliderImages, setSliderImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/assets");
        const data = await res.json();
        if (data.slides?.length) {
          const formatted = data.slides.map((url, index) => ({
            src: url,
            alt: `Slider Image ${index + 1}`,
            isHero: index === 0, 
          }));
          setSliderImages(formatted);
        }
      } catch (err) {
        console.error("Failed to load slides", err);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderImages, currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!sliderImages.length) return <p>Loading...</p>;

  return (
    <main className="relative">
      <section className="w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] 2xl:h-[750px] relative flex justify-end items-center">
        <Image
          src={sliderImages[currentSlide].src}
          alt={sliderImages[currentSlide].alt}
          quality={100}
          fill
          style={{
            objectFit: "cover",
            position: "absolute",
            zIndex: "-1",
          }}
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-gray-400"
              } transition-all`}
            />
          ))}
        </div>
      </section>

      <ProductsScroll className="z-10" category="spices" />
      <ProductsScroll className="z-10" category="pickles" />
      <div className="w-full lg:mb-10 flex justify-center">
        <video
          className="w-full sm:h-[300px] md:h-[400px] lg:h-[600px] xl:h-auto object-cover object-bottom"
          loop
          muted
          autoPlay
        >
          <source
            src="https://files.manasaspices.com/videos/Spices_Estate.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <OtherProducts className="z-10" />
      <Unique className="z-10" />
    </main>
  );
}
