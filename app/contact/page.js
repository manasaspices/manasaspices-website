"use client";
import emailjs from "emailjs-com";
import { useRef, useState } from "react";
import ProdImg from "@/public/images/prodImg.png";
import { MuseoModerno } from "next/font/google";
import Image from "next/image";
import { FaEnvelope, FaMailBulk, FaPhone } from "react-icons/fa";

const museo = MuseoModerno({ subsets: ["latin"] });

const ContactForm = () => {
  const form = useRef();
  emailjs.init("IWUwTqxuYCqx7E4k2"); // user id param is the public key from emailjs

  const [emailError, setEmailError] = useState(""); // Email error state
  const [phoneError, setPhoneError] = useState(""); // Phone error state

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ktttt1c", "template_0d67yfp", form.current)
      .then(
        () => {
          console.log("SUCCESS!");
          window.location.reload();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }

    if (name === "phone") {
      const phonePattern = /^[6-9][0-9]{9}$/; 
      if (!phonePattern.test(value)) {
        setPhoneError("Please enter a valid 10-digit phone number.");
      } else {
        setPhoneError("");
      }
    }
  };

  return (
    <main className="min-h-screen">
      {/* Header Image Section */}
      <div className="relative h-60 lg:h-[400px]">
        <Image src={ProdImg} alt="header" className="object-cover h-full" />
        <h1
          className={`absolute z-10 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-extrabold text-white p-2 ${museo.className}`}
        >
          CONTACT US
        </h1>
        <hr
          className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-42 md:w-44 lg:w-46 xl:w-48 h-1 bg-black border-0 rounded dark:bg-white mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-10"
        />
      </div>

      {/* Contact Form Section */}
      <div className="flex max-md:flex-col justify-center items-start gap-10 my-10 px-4 sm:px-10">
        <div className="mx-10">
          <h1 className="text-2xl font-bold text-manasa-green my-3 border-b-4">
            Let&apos;s get in Touch
          </h1>
          <span className="text-lg flex my-2"><FaPhone className="mr-6"/>+91 99443 68704</span>
          <span className="text-lg flex my-2"><FaEnvelope className="mr-6"/>sales@manasaspices.com</span>
        </div>
        {/* Contact Form */}
        <div className="w-full lg:w-[45%] border-2 border-manasa-green rounded-md p-6 sm:p-10">
          <form className="mt-6 w-full" ref={form} onSubmit={sendEmail}>
            {/* Name and Email */}
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <label className="flex-1" htmlFor="from_name">
                <span className="text-slate-900">Your name<span className="text-red-600">*</span></span>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:ring focus:ring-manasa-red focus:outline-none"
                  placeholder="Your Name"
                  aria-required="true"
                />
              </label>
              <label className="flex-1" htmlFor="email">
                <span className="text-slate-900">Email address <span className="text-red-600">*</span></span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:ring focus:ring-manasa-red focus:outline-none"
                  placeholder="example@mail.com"
                  aria-required="true"
                  onChange={handleFieldChange} // Added the onChange handler
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>} {/* Show email error */}
              </label>
            </div>

            {/* Phone and Subject */}
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <label className="flex-1" htmlFor="phone">
                <span className="text-slate-900">Phone Number <span className="text-red-600">*</span> </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:ring focus:ring-manasa-red focus:outline-none"
                  placeholder="Phone no."
                  aria-required="true"
                  onChange={handleFieldChange} // Added the onChange handler
                />
                {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>} {/* Show phone error */}
              </label>
              <label className="flex-1" htmlFor="subject">
                <span className="text-slate-900">Subject</span>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:ring focus:ring-manasa-red focus:outline-none"
                  placeholder="Subject"
                />
              </label>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label htmlFor="message">
                <span className="text-slate-900">Message<span className="text-red-600">*</span></span>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  maxLength="300"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:ring focus:ring-manasa-red focus:outline-none"
                  aria-required="true"
                  placeholder="Type your queries here"
                ></textarea>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-10 px-5 text-white bg-manasa-green rounded-lg transition-all duration-150 hover:bg-red-700 focus:ring-2 focus:ring-red-300"
            >
              Contact Us
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ContactForm;
