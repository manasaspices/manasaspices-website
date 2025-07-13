"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchPopup from "./SearchPopup";
import logo2 from "@/public/images/logo3.png";
import search from "@/public/icons/search.svg";
import cartimg from "@/public/icons/cart.svg";
import profile from "@/public/icons/profile.svg";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const { cart } = useCart(); 
  const cartCount = cart.length; 

  const handleSearchClick = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed z-50 w-full h-[64px] bg-white dark:bg-black dark:text-white text-manasa-red flex items-center justify-between px-4">
      {/* Mobile Navigation and Hamburger Button */}
      <div className="flex items-center space-x-8">
        <button onClick={toggleMenu} className="lg:hidden text-2xl">
          <span className="text-manasa-green dark:text-white">☰</span>
        </button>
        <a href="/" className="text-3xl text-manasa-red dark:text-white">
        <Image src={logo2} alt="Manasa Logo" className="h-[40px] lg:h-[60px] w-auto lg:mx-10 xl:mx-6"/>
        </a>
      </div>
      <div className="flex items-center h-full">
        <div className="hidden lg:flex items-center justify-center space-x-8">
          <a href="/" className="text-2xl w-24 text-center text-manasa-green dark:text-white hover:text-manasa-red hover:font-bold dark:hover:font-normal transition-all">
            home
          </a>
          <a href="/about" className="text-2xl w-24 text-center text-manasa-green dark:text-white hover:text-manasa-red hover:font-bold dark:hover:font-normal transition-all">
            about
          </a>
          <a href="/products" className="text-2xl w-32 text-center text-manasa-green dark:text-white hover:text-manasa-red hover:font-bold dark:hover:font-normal transition-all">
            products
          </a>
          <a href="/contact" className="text-2xl w-40 text-center text-manasa-green dark:text-white hover:text-manasa-red hover:font-bold dark:hover:font-normal transition-all">
            contact us
          </a>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-[64px] left-0 w-full bg-white dark:bg-black text-manasa-red dark:text-white p-4 transition-all duration-300 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <a href="/" className="block text-xl py-2 text-center text-manasa-green dark:text-white hover:text-manasa-red hover:font-bold dark:hover:font-normal transition-all">
            home
          </a>
          <a href="/about" className="block text-xl py-2 text-center text-manasa-green dark:text-white hover:text-manasa-red hover:font-bold dark:hover:font-normal transition-all">
            about
          </a>
          <a href="/products" className="block text-xl py-2 text-center text-manasa-green dark:text-white hover:text-manasa-red hover:font-bold dark:hover:font-normal transition-all">
            products
          </a>
          <a href="/contact" className="block text-xl py-2 text-center text-manasa-green dark:text-white hover:text-manasa-red hover:font-bold dark:hover:font-normal transition-all">
            contact us
          </a>
        </div>

        <div className="flex items-center justify-center space-x-4 lg:space-x-8 lg:mx-4 lg:px-4 lg:border-l-2 border-manasa-red dark:border-white h-3/4">
          <button onClick={handleSearchClick} className="w-[30px] h-[30px]">
            <Image src={search} alt="search icon" width={30} height={30} />
          </button>

          {/* Cart Icon with Notification Badge */}
          <div className="relative w-[30px] h-[30px]">
            <Link href="/cart">
              <Image src={cartimg} alt="cart icon" width={30} height={30} />
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <Link href={status === "authenticated" ? "/profile" : "/auth/login"} className="w-[30px] h-[30px]">
            <Image src={profile} alt="profile icon" width={30} height={30} />
          </Link>
        </div>
      </div>
      <SearchPopup isOpen={isOpen} onClose={handleClose} />
    </nav>
  );
};

export default NavBar;
