"use client";

import { MuseoModerno } from "next/font/google";
import Image from "next/image";
import Aboutimg from "@/public/images/aboutimg.jpg";
import ImageGrid from "./components/ImageGrid";
import StoryContent from "./components/StoryContent";
import ValuesBento from "./components/ValuesBento";
import ChooseUs from "@/components/ChooseUs";

const museo = MuseoModerno({ subsets: ["latin"] });

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <div className="relative h-60 lg:h-[400px]">
        <Image
          src={Aboutimg}
          alt="about us header"
          className="object-cover h-full"
        />
        <h1
          className={`absolute z-10 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-extrabold text-white p-2 ${museo.className}`}
        >
          ABOUT US
        </h1>
        <hr
          className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-42 md:w-44 lg:w-46 xl:w-48 h-1 bg-black border-0 rounded dark:bg-white mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-10"
        />
      </div>

      {/* Our Story Section */}
      <div className="mx-auto lg:mx-40 lg:p-8">
        <h1
          className={`text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-manasa-green p-2 ${museo.className}`}
        >
          OUR STORY
        </h1>
        <hr className="w-40 sm:w-60 md:w-60 lg:w-60 xl:w-60 h-1 mx-[20px] bg-black border-0 rounded dark:bg-white" />
      </div>

      <div className="mx-auto my-8 w-[90%]">
        <div className="flex max-lg:flex-col items-center">
          <ImageGrid />
          <StoryContent />
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mx-auto lg:mx-40 p-8">
        <h1
          className={`text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-manasa-green p-2 ${museo.className}`}
        >
          OUR VALUES
        </h1>
        <hr className="w-40 sm:w-40 md:w-58 lg:w-50 h-1 mx-[30px] bg-black border-0 rounded dark:bg-white" />
      </div>

      <ValuesBento />
      <ChooseUs />
    </main>
  );
}