import Image from 'next/image';
import logo from "@/public/images/logo.png";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";

const navItems = [
  { text: 'Home', href: '/' },
  { text: 'About Us', href: '/about' },
  { text: 'Our Spices', href: '/products' },
  { text: 'Contact Us', href: '/contact' }
];

{/*const socials = [
    { id: 1, name: "Facebook", icon: <FaFacebook />, url: "https://www.facebook.com/profile.php?id=61563518063135&ref=xav_ig_profile_web", color: "text-white", hover: "hover:text-blue-800" },
    { id: 2, name: "Twitter", icon: <FaXTwitter />, url: "https://x.com/", color: "text-white", hover: "hover:text-gray-800" },  //needs to be added
    { id: 3, name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/manasaspices/", color: "text-white", hover: "hover:text-pink-700" },
    { id: 5, name: "Whatsapp", icon: <FaWhatsapp />, url: "https://wa.me/1234567890", color: "text-white", hover: "hover:text-green-700" },  //number needed
    { id: 6, name: "Youtube", icon: <FaYoutube />, url: "https://youtube.com/", color: "text-white", hover: "hover:text-red-700" },  //yt channel needed
    { id: 7, name: "Threads", icon: <FaThreads />, url: "https://www.threads.net/@manasaspices?xmt=AQGzIfFglX2TKU2kL5YsX80ZCiIgl9GRODZptOOvfohfksw", color: "text-white", hover: "hover:text-gray-800" },
];*/}3

function NavLink({ href, text }) {
  return (
    <a href={href} className="hover:underline">
      {text}
    </a>
  );
}

function Footer() { 
    
  return (
    <footer className="flex flex-col items-center px-16 pt-10 pb-7 bg-manasa-green max-md:px-5 z-50">
        <div className='bg-black w-full h-full opacity-10'/>
      
      <div className="flex flex-col items-center w-full max-w-[800px]">
        <Image src={logo} className="w-24" alt="Manasa Logo" />
        <nav className="flex max-md:flex-col max-md:text-center flex-wrap gap-5 justify-between mt-10 max-w-full text-lg font-semibold text-white w-[570px]">
          {navItems.map((item, index) => (
            <NavLink key={index} href={item.href} text={item.text} />
          ))}
        </nav>
        <hr className="self-stretch my-10 border border-slate-100 border-solid max-md:max-w-full" />
        {/*<div className="flex justify-center flex-wrap gap-3 sm:gap-3 md:gap-4 m-12 z-10">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xl mx-2 sm:text-3xl md:text-3xl transition-colors duration-300 ${social.color} ${social.hover}`}
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>*/}
        <p className="m-3 text-base text-white text-center">
          Copyright © 2024 | Manasa | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;