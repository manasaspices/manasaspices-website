import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";
import Providers from "./Providers";
import Image from "next/image";
import wlogo from "@/public/icons/whatsapplogo.svg";

export const metadata = {
  title: "Manasa Spices",
  description: "Experience the Authentic Taste & Heritage of India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
              {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/919944368704"  
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-50 group"
        >
          <div className="relative">
            <Image
              src={wlogo}
              alt="Chat on WhatsApp"
              className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform"
            />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping bg-green-600 opacity-60"></span>
            {/* Tooltip */}
            <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Chat with us
            </span>
          </div>
        </a>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
