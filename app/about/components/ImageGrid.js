import React from "react";
import Image from "next/image";

function ImageGrid() {
  return (
    <div className="mx-auto my-5 px-5 lg:w-1/2">
      <div className="grid grid-cols-1  md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <div>
            <Image
              loading="lazy"
              src="https://files.manasaspices.com/images/staffImages/1.jpg"
              width={1600}
              height={1067}
              alt="Lady picking Tea Leaves"
              className="w-full md:h-[350px] xl:h-[350px] object-cover rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Image
              loading="lazy"
              src="https://files.manasaspices.com/images/staffImages/2.jpg"
              width={1600}
              height={2404}
              alt="Supplementary image 1"
              className="w-full md:w-[200px] h-[200px] object-cover rounded-xl"
            />
            <Image
              loading="lazy"
              src="https://files.manasaspices.com/images/staffImages/3.jpg"
              width={1600}
              height={2404}
              alt="Supplementary image 2"
              className="w-full h-[200px] object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <Image
              loading="lazy"
              src="https://files.manasaspices.com/images/staffImages/7.jpg"
              width={1600}
              height={2404}
              alt="Additional image 1"
              className="w-full h-[300px] md:h-[300px] object-cover rounded-xl"
            />
          </div>
          <div>
            <Image
              loading="lazy"
              src="https://files.manasaspices.com/images/staffImages/6.jpg"
              width={1600}
              height={2404}
              alt="Additional image 2"
              className="w-full h-[300px] md:h-[250px] object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGrid;
