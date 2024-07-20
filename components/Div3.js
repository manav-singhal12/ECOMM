import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Div3 = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="relative w-full max-w-xl mx-auto">
          <Image
            src="/fashionone.webp"
            alt="Fashion One"
            width={800}
            height={800}
            className="object-cover rounded-lg"
          />
        </div>
        
        {/* Content Section */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl md:text-5xl leading-normal text-customPink font-bold mb-5">
            Surf Through Trendy <br />ACCESSORIES AT 30% OFF
          </h1>
          <p className="text-lg md:text-2xl mb-5">
            Get your favorite accessories at just 30% OFF
          </p>
          <Link href="/categories/Accessories">
            <div className="inline-block text-customPink border-2 border-customPink hover:bg-customPink hover:text-white rounded-lg px-6 py-3 transition duration-300">
              View More
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Div3;
