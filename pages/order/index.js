import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';

export const metadata = {
  title: "Looks-Order Page",
  description: "Find best styling products from here",
};

const Order = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push('/signup');
    }
  }, [router, session, status]);

  const { itemcode, qty, description, price, name, size, variant, image1, total } = router.query;

  const [order, setOrder] = useState({});
  const [sizes, setSizes] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    try {
      const savedorder = localStorage.getItem("order");
      if (savedorder) {
        setOrder(JSON.parse(savedorder));
      }
    } catch (error) {
      console.error("Failed to parse order from localStorage:", error);
      localStorage.removeItem("order");
    }
  }, []);

  const saveOrder = (myorder) => {
    localStorage.setItem("order", JSON.stringify(myorder));
  };

  const addToOrder = async (itemcode, qty, description, price, name, size, variant, image1) => {
    const updatedorder = { ...order };
    const formatDateTime = () => {
      const now = new Date();
      
      const month = now.getMonth() + 1; // Months are 0-based
      const day = now.getDate();
      const year = now.getFullYear();
      
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours || 12; // the hour '0' should be '12'
      
      return `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    };
    
    // Usage
    const currentDate = formatDateTime();
    console.log(currentDate); // e.g., "7/26/2024 5:02:07 PM"
    
    
      updatedorder[session.user.email] = { qty, price, name, image1,time: currentDate };  
    
    setOrder(updatedorder);
    saveOrder(updatedorder);

    // Save order to MongoDB
    if (session?.user?.email) {
      try {
        const response = await fetch('/api/order/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_email: session.user.email,
            order: updatedorder,
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
          toast.error(`Failed to save order: ${data.message}`, {
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
        console.error('Failed to save order:', error);
        toast.error('Failed to save order.', {
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
  };
  return (
    <>
      <Head>
        <title>Order Now</title>
        <meta name="description" content="Contact us to learn more about our clothing products." />
      </Head>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
          <h1 className="text-3xl font-semibold text-center mb-8">Order Summary</h1>
          <div className="flex gap-8">
            <div className="relative w-56 h-56">
              {itemcode === 15 ? (
                <Image
                  src='/bs.png'
                  alt="Product Image"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg h-96 w-96"
                />
              ) : (
                <Image
                  src={image1}
                  alt="Product Image"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg h-44 w-44"
                />
              )}
            </div>
            <div>
              <p className="text-xl font-semibold text-customPink">{name}</p>
              <p className="text-lg text-gray-700">Description: {description}</p>
              <p className="text-lg text-gray-700">Price: ₹{price}</p>
              <p className="text-lg text-gray-700">Quantity: {qty}</p>
              <p className="text-lg text-gray-700">Size: {size}</p>
              <p className="text-lg text-gray-700">Variant: {variant}</p>
              <p className="text-xl font-semibold mt-4">Total: ₹{(qty * price).toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Link href='/orders'>
              <span onClick={() => { addToOrder(itemcode, qty, description, price, name, size, variant, image1) }} className="border-2 border-customPink p-2 gap-1 items-center flex justify-center k rounded-lg text-customPink hover:bg-customPink hover:text-white h-10 w-44 mx-auto font-semibold text-xl mt-10 my-10">
                Buy Now
              </span>
            </Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Order;
