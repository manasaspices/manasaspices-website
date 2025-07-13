'use client'

import { MuseoModerno } from "next/font/google"
import Image from "next/image"
import cruelty from "@/public/images/cruelty-free.png"
import natural from "@/public/images/nature.png"
import gmo from "@/public/images/non-gmo.png"
import nopreserv from "@/public/images/no-preservatives.png"
import sustainable from "@/public/images/sustainable.png"

const museo = MuseoModerno({subsets: ['latin']})

function ChooseUs () {
    return (
        <div className="mx-5 my-10 p-8">
            <h1 className={`${'text-3xl sm:text-4xl lg:text-5xl'} font-extrabold text-manasa-green p-2 ${museo.className} inline-block border-b-2 sm:border-b-4 lg:border-b-6 border-0 border-black`}>
                WHY YOU SHOULD CHOOSE US
            </h1>

            {/* Grid layout for small screens, flex for larger screens */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-10 justify-center max-md:grid-cols-2">
                <div className="flex flex-col items-center justify-center w-full">
                    <Image src={cruelty} alt="cruelty-free" className="w-28 h-28" />
                    <h2 className="text-lg lg:text-xl mt-4 font-semibold text-center text-black">CRUELTY-FREE</h2>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <Image src={natural} alt="natural" className="w-28 h-28" />
                    <h2 className="text-lg lg:text-xl mt-4 font-semibold text-center text-black">100% NATURAL</h2>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <Image src={gmo} alt="non-gmo" className="w-28 h-28" />
                    <h2 className="text-lg lg:text-xl mt-4 font-semibold text-center text-black">NON-GMO</h2>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <Image src={nopreserv} alt="no-preservatives" className="w-28 h-28" />
                    <h2 className="text-lg lg:text-xl mt-4 font-semibold text-center text-black">NO ADDED PRESERVATIVES</h2>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <Image src={sustainable} alt="sustainable" className="w-28 h-28" />
                    <h2 className="text-lg lg:text-xl mt-4 font-semibold text-center text-black">SUSTAINABLE</h2>
                </div>
            </div>
        </div>          
    );
}

export default ChooseUs;
