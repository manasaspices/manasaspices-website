"use client";
import Image from "next/image";
import { useState } from "react";

const Accordion = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full mx-auto my-10">
      {/* Section 1 */}
      <div className="bg-manasa-green text-white">
        <button
          onClick={() => toggleSection(0)}
          className="w-full text-left p-4 flex justify-between items-center"
        >
          <span className="text-lg sm:text-xl font-semibold">Description</span>
          <span>{activeIndex === 0 ? "−" : "+"}</span>
        </button>
        {activeIndex === 0 && (
          <div className="p-6 sm:p-8 md:p-10 bg-amber-100 text-gray-700">
            <div className="flex flex-col md:flex-row justify-around space-y-4 md:space-y-0">
              <div className="w-full md:w-3/5">
                <h1 className="my-4 text-xl sm:text-2xl font-semibold">
                  {products.name}
                </h1>
                <p className="text-base sm:text-lg md:text-lg">
                  {products.prod_desc}
                </p>

                <h1 className="my-4 text-xl sm:text-2xl font-semibold">Origin</h1>
                <p className="text-base sm:text-lg md:text-lg">{products.origin}</p>

                <h1 className="my-4 text-xl sm:text-2xl font-semibold">
                  Health Benefits
                </h1>
                <p className="text-base sm:text-lg md:text-lg">
                  {products.healthben}
                </p>
              </div>
              <div className="w-2/5 content-center">
                <Image src={products.thumbnail_img} alt={products.name} width={640} height={427} className="px-3 max-h-[427px]"/>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 2 */}
      <div className="bg-manasa-green text-white mt-4 sm:mt-6">
        <button
          onClick={() => toggleSection(1)}
          className="w-full text-left p-4 flex justify-between items-center"
        >
          <span className="text-lg sm:text-xl font-semibold">
            Additional Information
          </span>
          <span>{activeIndex === 1 ? "−" : "+"}</span>
        </button>
        {activeIndex === 1 && (
          <div className="p-6 sm:p-8 md:p-10 bg-amber-100 text-gray-700">
            <table className="w-full text-left border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <th className="border border-gray-300 p-2 font-semibold">
                    Weight
                  </th>
                  <td className="border border-gray-300 p-2">
                    {products.quantity.join(", ")}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-300 p-2 font-semibold">
                    Ingredients
                  </th>
                  <td className="border border-gray-300 p-2">
                    {products.ingredient}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-300 p-2 font-semibold">
                    Shelf Life
                  </th>
                  <td className="border border-gray-300 p-2">
                    {products.shelflife}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-300 p-2 font-semibold">
                    Storage Instructions
                  </th>
                  <td className="border border-gray-300 p-2">
                    {products.storageinst}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-300 p-2 font-semibold">
                    Special Features
                  </th>
                  <td className="border border-gray-300 p-2">
                    {products.specfeats}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-300 p-2 font-semibold">
                    Certifications
                  </th>
                  <td className="border border-gray-300 p-2">{products.certifs}</td>
                </tr>
                <tr>
                  <th className="border border-gray-300 p-2 font-semibold">
                    Region
                  </th>
                  <td className="border border-gray-300 p-2">{products.region}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section 3 */}
      <div className="bg-manasa-green text-white mt-4 sm:mt-6">
        <button
          onClick={() => toggleSection(2)}
          className="w-full text-left p-4 flex justify-between items-center"
        >
          <span className="text-lg sm:text-xl font-semibold">
            Shipping and Return Policy
          </span>
          <span>{activeIndex === 2 ? "−" : "+"}</span>
        </button>
        {activeIndex === 2 && (
          <div className="p-6 sm:p-8 md:p-10 bg-amber-100 text-gray-700">
            T&C Apply.
          </div>
        )}
      </div>
    </section>
  );
};

export default Accordion;