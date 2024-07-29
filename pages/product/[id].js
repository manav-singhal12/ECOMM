"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import productsData from '@/public/products.json';
import productswholesaleData from '@/public/productswholesale.json';
import { toast, ToastContainer } from 'react-toastify';
import { Bounce } from 'react-toastify';
import Image from 'next/image';
import "@/app/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Loader from '@/components/Loader';

export const metadata = {
  title: "Looks-Product",
  description: "Find best styling products from here",
};

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [cart, setCart] = useState({});
  const [sizes, setSizes] = useState([]);
  const [loadingAction, setLoadingAction] = useState(false); // Loader state for actions
  const { data: session } = useSession();

  useEffect(() => {
    if (id) {
      const productData = session?.user?.email?.endsWith('@looks') ? productswholesaleData : productsData;
      const foundProduct = productData.find(product => product.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setSizes(foundProduct.sizes || []);
      } else {
        console.error(`Product with ID ${id} not found`);
      }
      setLoading(false);
    }
  }, [id, session]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      localStorage.removeItem("cart");
    }
  }, []);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  const addToCart = async (itemcode, qty, description, price, name, size, variant, image1) => {
    setLoadingAction(true); // Start loading for Add to Cart

    const updatedCart = { ...cart };
    if (itemcode in updatedCart) {
      updatedCart[itemcode].qty += qty;
    } else {
      updatedCart[itemcode] = { qty, price, name, image1 };
    }
    setCart(updatedCart);
    saveCart(updatedCart);

    // Save cart to MongoDB
    if (session?.user?.email) {
      try {
        const response = await fetch('/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_email: session.user.email,
            cart: updatedCart,
          }),
        });

        if (response.ok) {
          toast('Item Added to Bag', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Bounce,
          });
        } else {
          const data = await response.json();
          toast.error(`Failed to save cart: ${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Bounce,
          });
        }
      } catch (error) {
        console.error('Failed to save cart:', error);
        toast.error('Failed to save cart.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
        });
      }
    }
    setLoadingAction(false); // Stop loading for Add to Cart
  };

  const handleBuyNow = () => {
    setLoadingAction(true); // Start loading for Buy Now
    // You might want to handle "Buy Now" logic here, e.g., redirect to checkout with item details
    setLoadingAction(false); // Stop loading for Buy Now
  };

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

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

  const quantity = session?.user?.email.endsWith('@looks') ? 5 : 1;

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
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description || "Explore this product on our site."} />
      </Head>
      {loadingAction && <Loader />} {/* Show loader when performing actions */}
      <div className="flex flex-col lg:flex-row my-4">
        {/* Left Section - Product Images */}
        <div className="lg:w-2/5 flex flex-col items-center justify-center mb-6 lg:mb-0">
          <div className="flex sm:flex-row items-center">
            <div className="flex flex-col items-center lg:items-start w-full lg:w-auto">
              <Image
                className="my-2 h-20 w-20 cursor-pointer object-contain"
                width={120}
                height={120}
                src={product.image1}
                alt="Product Image 1"
                onClick={() => setImageIndex(0)}
              />
              {product.image2 && (
                <Image
                  className="my-2 h-20 w-20 cursor-pointer object-contain"
                  width={120}
                  height={120}
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
            <div className="buynow h-16 border-2 border-customPink flex justify-center items-center text-xl text-customPink font-semibold hover:bg-customPink hover:text-white cursor-pointer mt-4 ml-10 w-36 rounded-lg">
              <lord-icon className='icon-hover'
                src="https://cdn.lordicon.com/pbrgppbb.json"
                trigger="hover"
                colors="primary:#EB3963"
                style={{ width: '25px', height: '25px' }}
              />
              <style jsx>{`
                .icon-hover:hover {
                  filter: brightness(1.1); 
                }
              `}</style>
              <Link
                href={{
                  pathname: '/order',
                  query: {
                    itemcode: product.id,
                    qty: quantity,
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
                <span onClick={handleBuyNow}>Buy Now</span>
              </Link>
            </div>
            <button 
              onClick={() => addToCart(product.id, quantity, product.description, product.price, product.name, "S", "M", product.image1)} 
              className="border-2 border-customPink bg-customPink text-white px-2 flex gap-1 justify-center items-center h-18"
            >
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
          {product.inStock ? <p className='text-customPink text-lg'>In Stock</p> : <p className='text-customPink text-lg'>Out of Stock</p>}

          <div className="flex my-4 gap-5">
            <p className="text-5xl text-customPink">₹{product.price}</p>
            <p className="text-customPink text-lg line-through mt-5">₹{product.originalPrice}</p>
            <p className="text-xl mt-5">{product.discount}% off</p>
          </div>
          <p>Product Code: {product.id}</p>
          <p className="text-2xl text-customPink my-4 font-semibold">Product Details</p>
          <p>{product.details}</p>
          <p className="text-2xl text-customPink my-4 font-semibold">Product Description</p>
          <p>{product.description}</p>
          <div className="colors mt-6">
            <p className="text-customPink text-lg">Available Colors</p>
            <div className="flex gap-2 mt-2">
              <div className={`h-8 w-8 bg-red-500 border-2 cursor-pointer rounded-full`}></div>
              <div className={`h-8 w-8 bg-blue-500 border-2 cursor-pointer rounded-full`}></div>
              <div className={`h-8 w-8 bg-green-500 border-2 cursor-pointer rounded-full`}></div>
            </div>
          </div>
          <div className="flex mt-6">
            <div className="size mr-8">
              <p className="text-customPink text-lg">Available Sizes</p>
              <div className="flex gap-2 mt-2">
                {sizes.map((size, index) => (
                  <div key={index} className="flex justify-center items-center bg-customPink text-white h-8 w-8 border-2 border-pink-400 rounded-md cursor-pointer">{size}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
