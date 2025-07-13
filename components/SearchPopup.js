import { useState } from 'react';
import Image from 'next/image';
import closeIcon from '@/public/icons/close.svg'; 
import {products} from '@/public/products';

const productList = products;

const SearchPopup = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  const filteredList = productList.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 bg-white dark:bg-black bg-opacity-90 overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8 md:p-10">
      {/* Close Button */}
      <button className="absolute top-4 left-4 sm:top-6 sm:left-6" onClick={onClose}>
        <Image src={closeIcon} alt="Close" width={24} height={24} />
      </button>

      {/* Search Input Field */}
      <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search for products..."
  className="w-full max-w-xl sm:max-w-2xl p-4 text-2xl border-b-2 border-gray-400 focus:outline-none focus:border-manasa-red dark:focus:border-white bg-transparent text-center mt-16 sm:mt-16 md:mt-16"
/>


      {/* Product List */}
      <div className="mt-8 w-full max-w-xl sm:max-w-2xl flex flex-col items-center">
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <a
              key={index}
              className="p-4 text-xl text-center text-manasa-green dark:text-white w-full sm:w-3/4 lg:w-full"
              href={`/products/${item.url}`}
            >
              {item.name}
            </a>
          ))
        ) : (
          <div className="p-4 text-xl text-center text-gray-500 dark:text-gray-400 w-full sm:w-3/4 lg:w-full">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPopup;
