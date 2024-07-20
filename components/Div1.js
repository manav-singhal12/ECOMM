"use client"
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Div1.css'
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom Next Arrow
// import { useState } from 'react';
const NextArrow = ({ onClick }) => {
  return (
    <button className="slick-next absolute top-1/2 transform -translate-y-1/2 right-10 z-10 border-2 bg-customPink" onClick={onClick}>
      <Image src="/right.svg" width={40} height={40} alt="Next" className="hover:scale-110 transition-transform duration-300" />
    </button>
  );
};

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => {
  return (
    <button className="slick-prev absolute top-1/2 transform -translate-y-1/2 left-4 z-10 border-2 bg-customPink" onClick={onClick}>
      <Image src="/left.svg" width={40} height={40} alt="Previous" className="hover:scale-110 transition-transform duration-300" />
    </button>
  );
};

const Div1 = () => {
  const [favourite, setFavourite] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // State to track active circle index
  const [cart, setCart] = useState({});

  const makeFavourite = () => {
    setFavourite(!favourite);
  }

  const initialColors = ['white', 'white', 'white', 'white', 'white'];
  const texts = ['S', 'M', 'L', 'XL', 'XXL'];

  // Handler to update active circle index
  const handleCircleClick = (index) => {
    setActiveIndex(index); // Set active index to the clicked circle
  };
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(cart);
    // for (let i = 0; i < keys.length; i++) {
    //     subt += myCart[keys[i]].price * myCart[keys[i]].qty
    // }
    // setSubTotal(subt);
  };
  const addToCart = (itemcode, qty, description, price, name, size, variant, image1) => {
    // console.log(image1)
    let newCart = cart;
    if (itemcode in cart) {
      newCart[itemcode].qty = cart[itemcode].qty + qty;
    } else {
      newCart[itemcode] = { qty: 1, price, name, image1 };
    }
    setCart(newCart);
    saveCart(newCart);
    toast('Item Added to Bag', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  const slides = [

    {
      id: 15,
      image: '/image.png',
      title: "COTTON - KNITTED LEGGINGS",
      price: "899",
      alt: 'Slide 2',
      details: 'Cotton blend typically 95% cotton, Form-fitting with stretchy fabric, Elasticized for a comfortable fit',
      description: ' Crafted from soft, breathable cotton fabric, these leggings offer a snug yet flexible fit, perfect for everyday wear or casual outi  ngs.'
    },
    {
      id: 2,
      image: '/slide2.png',
      title: "DENIM JACKETS",
      price: "2499",
      alt: 'Slide 1',
      details: 'Suitable for both casual and semi-casual settings, pairs well with a range of outfits from dresses to t-shirts and jeans.',
      description: 'Crafted from durable denim fabric, they typically feature metal buttons, chest pockets, and often come in a classic blue hue.'
    },
    {
      id: 1,
      image: '/slide1.png',
      title: "MEN'S CASUAL SHIRTS",
      price: " 2999",
      alt: 'Slide 2',
      details: "Men's casual shirts are versatile pieces that cater to various style preferences and occasions, offering comfort without compromising on style. ",
      description: 'They strike a balance between relaxed charm and versatility, suitable for a variety of occasions from casual outings to semi-formal settings'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      `<div className="relative md:w-[90vw] w-full ">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div className="flex">
              <div key={index} className="flex  md:flex md:flex-row w-screen">
                <div className="left bg-pink-200 h-[85vh] w-[30vw] md:w-[30vw] md:h-[75vh] relative">
                  <div onClick={makeFavourite}>
                    {favourite && (
                      <div className='bg-customPink md:h-10 hidden cursor-pointer md:w-10 rounded-full md:flex justify-center items-center absolute right-6 top-6'>
                        <lord-icon
                          src="https://cdn.lordicon.com/ulnswmkk.json"
                          trigger="hover"
                          colors="primary:#ffffff"
                          style={{ width: '30px', height: '30px' }}
                        ></lord-icon>
                      </div>
                    )}
                    {!favourite && (
                      <div className='bg-white md:h-10 hidden cursor-pointer md:w-10 rounded-full md:flex justify-center items-center absolute right-6 top-6'>
                        <lord-icon
                          src="https://cdn.lordicon.com/ulnswmkk.json"
                          trigger="hover"
                          colors="primary:#EB3963"
                          style={{ width: '30px', height: '30px' }}
                        ></lord-icon>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    {/* <div className="bg-white h-[20vw] md:h-[18vw] w-[20vw] md:w-[18vw] rounded-full absolute left-[10%] md:left-[15%] -top-[10%] md:top-[4vh]"></div> */}
                    <Image
                      alt={slide.alt}
                      src={slide.image}
                      className="md:w-[20vw] md:h-[64vh] h-[40vh] mx-auto md:mx-0 md:absolute absolute top-24 md:-my-2 md:left-[12%] md:top-[44vh] md:transform  md:-translate-y-1/2 z-10 bottom-0"
                      width={150}
                      height={120}
                      quality={100}
                    // style={{ width: '20vw', height: '64vh' }}
                    />
                    <div className="colors flex md:gap-5 gap-2 flex-col md:absolute absolute  my-4 right-3 md:right-10 md:top-[50vh] md:transform md:-translate-y-1/2">
                      <div className='bg-blue-500 md:h-6 md:w-6 h-3 w-3 rounded-full border-white border-2'></div>
                      <div className='bg-green-500 md:h-6 md:w-6 h-3 w-3 rounded-full border-white border-2'></div>
                      <div className='bg-black md:h-6 md:w-6 h-3 w-3 rounded-full border-white border-2'></div>
                    </div>
                  </div>
                </div>
                <div className="right bg-sky-200 w-[65vw] h-[85vh] md:h-[75vh] relative ">
                  <div className="md:text-4xl text-lg mx-2 font-bold md:my-4 flex justify-center  text-customPink">{slide.title}</div>
                  <div className="second flex md:gap-14 md:mx-10">
                    <div className="bg-white md:h-36 md:w-36 w-12 h-12 mx-2 flex justify-center items-center rounded-full text-customPink md:text-3xl font-bold text-sm my-4">₹ {slide.price}</div>
                    <div className="size md:my-8 flex justify-center items-center">
                      <p className='md:text-3xl md:font-bold text-customPink text-sm'>Size:</p>
                      <div className="md:flex flex-wrap flex">
                        <div className="bg-white md:h-12 md:w-12 h-4 w-4 rounded-full md:mx-4 mx-1 flex justify-center items-center text-customPink font-bold md:text-2xl text-xs">S</div>
                        <div className="bg-white md:h-12 md:w-12 h-4 w-4 rounded-full md:mx-4 mx-1 flex justify-center items-center text-customPink font-bold md:text-2xl text-xs">M</div>
                        <div className="bg-white md:h-12 md:w-12 h-4 w-4 rounded-full md:mx-4 mx-1 flex justify-center items-center text-customPink font-bold md:text-2xl text-xs">L</div>
                        <div className="bg-white md:h-12 md:w-12 h-4 w-4 rounded-full md:mx-4 mx-1 flex justify-center items-center text-customPink font-bold md:text-2xl text-xs">XL</div>
                        
                      </div>

                    </div>
                  </div>
                  <div className="third md:my-10 md:mx-8 md:flex">
                    <div className="desc md:w-1/3 mx-2 mr-14">
                      <p className='font-bold text-customPink md:text-2xl'>Description</p>
                      <p2 className='text-xs md:text-lg leading-tight'>{slide.description}</p2>
                      </div>
                      <div className="desc md:w-1/3 mx-2 mr-14">
                      <p className='font-bold text-customPink md:text-2xl'>Details</p>
                      <p2 className='text-xs md:text-lg leading-tight'>{slide.details}</p2>
                      </div>
                  </div>
                  <div onClick={() => { addToCart(slide.id, 1, slide.description, slide.price, slide.name, "S", "M", slide.image) }} className="bag absolute right-12 bottom-12 md:right-20 md:bottom-0 flex justify-center items-center flex-col rounded-sm  bg-customPink h-24 w-24 md:h-36 md:w-44 ">
                      <span className=' '>
                        <lord-icon
                          src="https://cdn.lordicon.com/mqdkoaef.json"
                          trigger="hover"
                          style={{ width: '10vw', height: '10vh' }}
                        ></lord-icon>
                      </span>
                      <p className='text-white md:text-xl text-sm'>Add to bag</p>
                    </div>

                </div>


              </div>


            </div>

          ))}
        </Slider >
      </div > `
    </>
  );

};

export default Div1;
