"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MyComponent = () => {
    const [selectedContent, setSelectedContent] = useState("Content 1");
    const [button1Clicked, setButton1Clicked] = useState(true);
    const [button2Clicked, setButton2Clicked] = useState(false);

    const handleContentClick = (content) => {
        setSelectedContent(content);
    };

    const handleButton1Click = () => {
        setButton1Clicked(true);
        setButton2Clicked(false);
    };

    const handleButton2Click = () => {
        setButton1Clicked(false);
        setButton2Clicked(true);
    };

    return (
        <div className="second bg-pink-200 flex flex-col lg:flex-row gap-10 -my-1">
            <div className="left h-auto lg:h-[50vh] px-10 md:px-28 justify-center flex flex-col gap-5 lg:gap-20 items-center lg:items-start">
                <div className={`sone rounded-xl h-[8vh] w-full lg:w-[10vw] p-2 flex justify-center items-center cursor-pointer ${button1Clicked ? ' text-white bg-customPink' : 'bg-white'}`}>
                    <button onClick={() => { handleContentClick("Content 1"); handleButton1Click(); }}>Best Sellers</button>
                </div>
                <div className={`stwo rounded-xl h-[8vh] w-full lg:w-[10vw] p-2 flex justify-center items-center cursor-pointer ${button2Clicked ? 'bg-customPink text-white' : 'bg-white'}`} onClick={() => { handleContentClick("Content 2"); handleButton2Click(); }}>
                    New Arrivals
                </div>
            </div>
            <div className="right flex flex-col items-center lg:items-start">
                {selectedContent === "Content 1" ? (
                    <div className="content1">
                        <div className="writing py-6 text-center lg:text-left">
                            <h1 className='text-3xl my-2 font-bold text-customPink uppercase'>Best Sellers</h1>
                            <Link href='/categories/Best%20Sellers'><span className='py-2 px-2 hover:underline cursor-pointer'>View More</span></Link>
                        </div>
                        <div className="imagesbestseller grid grid-cols-2 md:grid-cols-3 lg:flex gap-4 lg:gap-20">
                            <Link href='/product/2'><span><Image src="/products/p2/image3.jpg" className='bg-customPink object-cover p-2 cursor-pointer h-48 w-44' height={180} width={200} alt="Content 1" /></span></Link>
                            <Link href='/product/3'><span><Image src="/products/p3/image1.jpg" className='bg-customPink object-cover p-2 cursor-pointer h-48 w-44' height={180} width={200} alt="Content 1" /></span></Link>
                            <Link href='/product/10'><span><Image src="/products/p10/image1.jpg" className='bg-customPink object-cover p-2 cursor-pointer h-48 w-44' height={180} width={200} alt="Content 1" /></span></Link>
                            <Link href='/product/12'><span><Image src="/products/p12/image1.jpg" className='bg-customPink object-cover p-2 cursor-pointer h-48 w-44' height={180} width={200} alt="Content 1" /></span></Link>
                        </div>
                    </div>
                ) : (
                    <div className="content2">
                        <div className="writing py-6 text-center lg:text-left">
                            <h1 className='text-3xl my-2 font-bold text-customPink uppercase'>New Arrivals</h1>
                            <Link href='/categories/New%20Arrivals'><span className='py-2 px-2 hover:underline cursor-pointer'>View More</span></Link>
                        </div>
                        <div className="imagesbestseller grid grid-cols-2 md:grid-cols-3 lg:flex gap-4 lg:gap-20">
                            <Link href='/product/1'><span><Image src="/products/p1/image3.jpg" className='bg-customPink object-cover p-2 cursor-pointer h-48 w-44' height={180} width={200} alt="Content 1" /></span></Link>
                            <Link href='/product/4'><span><Image src="/products/p4/image1.jpg" className='bg-customPink object-cover p-2 cursor-pointer h-48 w-44' height={180} width={200} alt="Content 1" /></span></Link>
                            <Link href='/product/13'><span><Image src="/products/p13/image1.jpg" className='bg-customPink object-cover p-2 cursor-pointer h-48 w-44' height={180} width={200} alt="Content 1" /></span></Link>
                            <Link href='/product/14'><span><Image src="/products/p14/image1.jpg" className='bg-customPink object-cover p-2 cursor-pointer h-48 w-44' height={180} width={200} alt="Content 1" /></span></Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyComponent;
