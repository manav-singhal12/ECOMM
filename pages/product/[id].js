// pages/product/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
import productsData from '@/public/products.json';
import { toast, ToastContainer } from 'react-toastify';
import { Bounce } from 'react-toastify';
import Image from 'next/image';
import "@/app/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
export const metadata = {
  title: "Looks-Product",
  description: "Find best styling products from here",
};
export default function ProductPage() {

  // console.log(addToCart)
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [count, setcount] = useState(0)
  const [cart, setCart] = useState({});
  const [sizes, setSizes] = useState(0)
  const { data: session } = useSession();

  console.log("cart", cart)
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
  const { itemcode, qty, description, price, name, size, variant, image1, total } = router.query;

  const [order, setOrder] = useState({});
  // const [sizes, setSizes] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const addToOrder = (itemcode, qty, description, price, name, size, variant, image1) => {
    const currentTime = new Date();
  const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;
;
// localStorage.clear()
    let newOrder = order;
    newOrder[itemcode] = { qty, price, name, image1, time: formattedTime };
    setOrder(newOrder);
    saveOrder(newOrder);
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

  useEffect(() => {
    try {
      if (localStorage.getItem('order')) {
        setOrder(JSON.parse(localStorage.getItem('order')));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const saveOrder = (myOrder) => {
    localStorage.setItem('order', JSON.stringify(myOrder));
    let subt = 0;
    let keys = Object.keys(myOrder);
    for (let i = 0; i < keys.length; i++) {
      subt += myOrder[keys[i]].price * myOrder[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  // useEffect(() => {
  //   if (!session) {
  //     router.push('/signup');
  //   }
  // }, [router, session]);
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
  useEffect(() => {
    setLoading(true);
    if (id && productsData) {
      const foundProduct = productsData.find((product) => product.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        console.log(`Product with ID ${id} not found`);
        setProduct(null); // Clear product state if not found
      }
    }
    setLoading(false);
  }, [id]);
  const add = () => {
    setcount(count + 1)
  }
  const sub = () => {
    if (count > 0) {
      setcount(count - 1)
    }
  }

  useEffect(() => {
    // Assuming productsData is an array of products where each product has a sizes array
    if (Array.isArray(productsData) && productsData.length > 0) {
      // Fetch sizes from the first product (you can adjust this based on your specific data structure)
      const sizesFromJson = productsData[0].sizes; // Change the index or structure as per your JSON
      setSizes(sizesFromJson);
    }
  }, []);
  if (loading) return <div>Loading...</div>;

  if (!product) {
    return <div>Product not found</div>;
  }

  const getImageUrl = () => {
    switch (imageIndex) {
      case 1:
        return product.image2;
      case 2:
        return product.image3;
      default:
        return product.image1;
    }
  };

  return (
    <><ToastContainer
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
    <Head>
    <title>Explore the product</title>
    <meta name="description" content="Contact us to learn more about our clothing products." />
  </Head>
      <div className="flex flex-col lg:flex-row my-4">
        {/* Left Section - Product Images */}
        <div className="lg:w-2/5 flex flex-col items-center justify-center mb-6 lg:mb-0">
          <div className="flex  sm:flex-row  items-center">
            <div className="flex flex-col items-center lg:items-start w-full lg:w-auto">
              <Image
                className="my-2 h-20 w-20 cursor-pointer object-contain"
                width={120}
                height={120}
                quality={100}
                src={product.image1}
                alt="Product Image 1"
                onClick={() => setImageIndex(0)}
              />
              {product.image2 && (
                <Image
                  className="my-2 h-20 w-20 cursor-pointer object-contain"
                  width={120}
                  height={120}
                  quality={100}
                  src={product.image2}
                  alt="Product Image 2"
                  onClick={() => setImageIndex(1)}
                />
              )}
              {product.image3 && (
                <Image
                  className="my-2 h-20 w-20 cursor-pointer object-contain"
                  width={120}
                  height={120}
                  quality={100}
                  src={product.image3}
                  alt="Product Image 3"
                  onClick={() => setImageIndex(2)}
                />
              )}
            </div>
            <Image
              className="lg:ml-6 h-96 lg:h-[60vh] lg:w-[75%] object-contain" 
              width={720}
              height={480}
              src={getImageUrl()}
              alt="Product Image"
            />
          </div>
          <div className="flex gap-8 mt-6">
            <button className="border-2 border-customPink text-customPink p-2 flex justify-center items-center">
              <lord-icon
                src="https://cdn.lordicon.com/ulnswmkk.json"
                trigger="hover"
                colors="primary:#EB3963"
                style={{ width: '18px', height: '18px' }}
              ></lord-icon>
              Add to Favourite
            </button>
            <button onClick={() => { addToCart(product.id, 1, product.description, product.price, product.name, "S", "M", product.image1) }} className="border-2 border-customPink bg-customPink text-white p-2 flex gap-1 justify-center items-center">
              <lord-icon
                src="https://cdn.lordicon.com/mqdkoaef.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{ width: '18px', height: '18px' }}
              ></lord-icon>
              Add to Bag
            </button>
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="lg:w-3/5 px-4">
          <h1 className="font-semibold text-customPink text-4xl uppercase">{product.name}</h1>
          <p className="text-lg">{product.catchy}</p>
          <p>Category: {product.category}</p>
          {product.inStock === true && <p className='text-customPink text-lg'>In Stock</p>}
          {product.inStock === false && <p className='text-customPink text-lg'>Out of Stock</p>}

          <div className="flex my-4 gap-5">
            <p className="text-5xl text-customPink">₹{product.price}</p>
            <p className="text-customPink text-lg line-through mt-5">₹{product.originalPrice}</p>
            <p className="text-xl mt-5 ">{product.discount}% off</p>
          </div>
          {/* <p>Product Rating</p> */}
          <p>Product Code: {product.id}</p>
          <p className="text-2xl text-customPink my-4 font-semibold">Product Details</p>
          <p>{product.details}</p>
          <p className="text-2xl text-customPink my-4 font-semibold">Product Description</p>
          <p>{product.description}</p>
          <div className="colors mt-6">
            <p className="text-customPink text-lg ">Available Colors</p>
            <div className="flex gap-2 mt-2">
              <div className={`h-8 w-8 bg-red-500 border-2 cursor-pointer rounded-full`}></div>
              <div className={`h-8 w-8 bg-blue-500 border-2 cursor-pointer rounded-full`}></div>
              <div className={`h-8 w-8 bg-green-500 border-2 cursor-pointer rounded-full`}></div>

              {/* Add more color options here */}
            </div>
          </div>
          <div className="flex mt-6">
            <div className="size mr-8">
              <p className="text-customPink text-lg">Available Sizes</p>
              <div className="flex gap-2 mt-2">
                {sizes.map((size, index) => (
                  <div key={index} className="flex justify-center items-center bg-customPink text-white  h-8 w-8 border-2 border-pink-400 rounded-md cursor-pointer" >{size}</div>
                ))
                }
                {/* Add more size options here */}
              </div>
            </div>
            
            <div className="buynow h-14 border-2 border-customPink flex justify-center items-center text-xl text-customPink font-semibold hover:bg-customPink hover:text-white cursor-pointer mt-4 ml-10 w-36 rounded-lg">
              <lord-icon className='icon-hover'
                src="https://cdn.lordicon.com/pbrgppbb.json"
                trigger="hover"
                colors="primary:#EB3963"

                style={{ width: '25px', height: '25px' }}
              /><style jsx>{`
                                .icon-hover:hover {
                                  filter: brightness(256S110); 
                                }
                              `}</style>
              <Link
                href={{
                  pathname: '/order',
                  query: {
                    itemcode: product.id,
                    qty: 1,
                    description: product.description,
                    price: product.price,
                    name: product.name,
                    size: 'S', // Example size, adjust as needed
                    variant: 'M', // Example variant, adjust as needed
                    image1: product.image1,
                  },
                }}
                passHref
              >
                <span className="">
                  Buy Now
                </span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
