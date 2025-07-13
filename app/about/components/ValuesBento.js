/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

const ValuesBento = () => {
  return (
    <section className="w-[90%] sm:w-[80%] lg:w-[70%] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto my-10">
      <div className="bg-manasa-green flex flex-col items-center justify-center col-span-1 md:col-span-2 h-auto lg:h-[300px] rounded-[30px] lg:rounded-[50px] p-3 text-white">
        {/*<Image
          src=""
          alt="logo1"
          className="h-[40px] lg:h-[50px] w-[40px] lg:w-[50px] bg-red-300 m-5 xl:hidden 2xl:block"
        />*/}
        <h1 className="mt-3 text-lg lg:text-xl font-bold text-center">
          Authenticity and Quality
        </h1>
        <p className="text-sm lg:text-lg m-5 text-center">
          We source high-quality, authentic produce from the finest farms in Kerala and beyond. Every step, from procurement to processing and packaging, is meticulously managed to ensure excellence and maintain the integrity of our spices.
        </p>
      </div>

      <div className="bg-manasa-green flex flex-col items-center justify-center col-span-1 h-auto lg:h-[300px] rounded-[30px] lg:rounded-[50px] p-2 text-white">
        {/*<Image
          src=""
          alt="logo2"
          className="h-[40px] md:h-[50px] w-[40px] md:w-[50px] bg-red-300 m-5 xl:hidden 2xl:block"
        />*/}
        <h1 className="mt-3 text-lg lg:text-xl font-bold text-center">
          Commitment to Health
        </h1>
        <p className="text-sm lg:text-lg m-5 text-center">
          We strive to keep you, our customer, healthy by providing spices that are as nourishing as they are flavorful. Sourced directly from trusted farmers, our products are a testament to nature's bounty and health benefits.
        </p>
      </div>

      <div className="bg-manasa-green flex flex-col items-center justify-center col-span-1 h-auto lg:h-[300px] rounded-[30px] lg:rounded-[50px] p-2 text-white">
        {/*<Image
          src=""
          alt="logo3"
          className="h-[40px] lg:h-[50px] w-[40px] lg:w-[50px] bg-red-300 m-5 xl:hidden 2xl:block"
        />*/}
        <h1 className="mt-3 text-lg lg:text-xl font-bold text-center">
          Innovation & Community Support
        </h1>
        <p className="text-sm lg:text-lg m-5 text-center">
          We believe in being the change we seek. By continuously finding innovative ways to support and uplift the local communities we work with, we aim to make the world not only healthier but also fairer.
        </p>
      </div>

      <div className="bg-manasa-green flex flex-col items-center justify-center md:col-span-2 h-auto lg:h-[300px] rounded-[30px] lg:rounded-[50px] p-2 text-white">
        {/*<Image
          src=""
          alt="logo4"
          className="h-[40px] lg:h-[50px] w-[40px] lg:w-[50px] bg-red-300 m-5 xl:hidden 2xl:block"
        />*/}
        <h1 className="mt-3 text-lg lg:text-xl font-bold text-center">
          Growth and Development
        </h1>
        <p className="text-sm lg:text-lg m-5 text-center">
          We support the growth and development of our colleagues. A team that grows together works wonders, and we encourage all our team members to continuously learn, evolve, and taste success. Guided by warmth, affection, and integrity, we ensure every interaction with our customers, farmers, colleagues, and stakeholders is positive and respectful.
        </p>
      </div>
    </section>
  );
};

export default ValuesBento;
