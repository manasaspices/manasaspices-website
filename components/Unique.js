'use client'

import Image from "next/image"
import { MuseoModerno } from "next/font/google"
import uniqueimage from "@/public/images/why-we-are-unique.svg"

const museo = MuseoModerno({ subsets: ['latin'] })

export default function Unique() {
    return (
        <section className="mx-4 sm:mx-10 lg:mx-20 my-5">
            <h1
                    className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-manasa-green p-2 font-museo inline-block border-b-2 sm:border-b-4 lg:border-b-6 border-black`}
                >
                    WHY WE ARE UNIQUE
                </h1>
            <div className="p-4 sm:p-6 lg:p-10 flex flex-col lg:flex-row mx-auto w-full lg:w-4/5 gap-8 items-center lg:items-start">
                {/* Image Section */}
                <Image
                    loading="lazy"
                    src={uniqueimage}
                    alt="Unique Image"
                    className="object-contain w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 mx-auto lg:mx-0"
                />
                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                    <article className="flex items-center space-x-4 p-1">
                        <div className="flex-shrink-0 h-[40px] w-[40px] rounded-full bg-manasa-green"></div>
                        <div className="flex flex-col">
                            <h1 className={`text-xl sm:text-2xl lg:w-auto lg:max-w-md lg:whitespace-normal lg:leading-snug ${museo.className}`}>
                                100% natural and organic
                            </h1>
                            <p className="text-base sm:text-lg lg:w-auto lg:max-w-md">
                                We source high quality authentic produce from the finest farms in India.
                            </p>
                        </div>
                    </article>
                    <article className="flex items-center space-x-4 p-1">
                        <div className="flex-shrink-0 h-[40px] w-[40px] rounded-full bg-manasa-green"></div>
                        <div className="flex flex-col">
                            <h1 className={`text-xl sm:text-2xl ${museo.className}`}>
                                no additives added
                            </h1>
                            <p className="text-base sm:text-lg">
                                Manasa brings you spices in their purest form, with absolutely no additives.
                            </p>
                        </div>
                    </article>
                    <article className="flex items-center space-x-4 p-1">
                        <div className="flex-shrink-0 h-[40px] w-[40px] rounded-full bg-manasa-green"></div>
                        <div className="flex flex-col">
                            <h1 className={`text-xl sm:text-2xl ${museo.className}`}>
                                cruelty free
                            </h1>
                            <p className="text-base sm:text-lg">
                                At Manasa, we ensure that every product is 100% cruelty-free.
                            </p>
                        </div>
                    </article>
                    <article className="flex items-center space-x-4 p-1">
                        <div className="flex-shrink-0 h-[40px] w-[40px] rounded-full bg-manasa-green"></div>
                        <div className="flex flex-col">
                            <h1 className={`text-xl sm:text-2xl ${museo.className}`}>
                                quality assurance
                            </h1>
                            <p className="text-base sm:text-lg">
                                Ensuring the integrity of our food safety is our highest priority.
                            </p>
                        </div>
                    </article>
                    <article className="flex items-center space-x-4 p-1">
                        <div className="flex-shrink-0 h-[40px] w-[40px] rounded-full bg-manasa-green"></div>
                        <div className="flex flex-col">
                            <h1 className={`text-xl sm:text-2xl ${museo.className}`}>
                                gmo free
                            </h1>
                            <p className="text-base sm:text-lg">
                                We guarantee to be completely GMO-free, preserving purity.
                            </p>
                        </div>
                    </article>
                    <article className="flex items-center space-x-4 p-1">
                        <div className="flex-shrink-0 h-[40px] w-[40px] rounded-full bg-manasa-green"></div>
                        <div className="flex flex-col">
                            <h1 className={`text-xl sm:text-2xl ${museo.className}`}>
                                made in India with love
                            </h1>
                            <p className="text-base sm:text-lg">
                                Our spices are a tribute to India&apos;s rich culinary heritage, made with love & care.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}