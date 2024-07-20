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
    title: "Looks-Your Orders",
    description: "Find best styling products from here",
  };
const Order = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { itemcode, qty, description, price, name, size, variant, image1 } = router.query;
  const [order, setOrder] = useState({});

  useEffect(() => {
      try {
          if (localStorage.getItem('order')) {
              setOrder(JSON.parse(localStorage.getItem('order')));
              console.log(order)
          }
      } catch (error) {
          console.error(error);
          localStorage.clear();
      }
  }, [order]);


  const saveOrder = (myOrder) => {
    localStorage.setItem('order', JSON.stringify(myOrder));
    let subt = 0;
    let keys = Object.keys(myOrder);
    // for (let i = 0; i < keys.length; i++) {
    //     subt += myOrder[keys[i]].price * myOrder[keys[i]].qty;
    // }
    // setSubTotal(subt);
};


  useEffect(() => {
    // getData()
    if (!session) {
      router.push('/signup')
    }
  }, [router, session])


  return (
    <div>
        <Head>
        <title>Your Orders
        </title>
        <meta name="description" content="Contact us to learn more about our clothing products." />
      </Head>
    {Object.keys(order).length === 0 && (
        <p1 className="flex justify-center items-center my-4 text-xl font-semibold text-customPink">
            No items in the order
        </p1>
    )}

    {Object.keys(order).map((k) => (
        <div
            key={k}
            className="flex flex-col md:flex-row gap-14 h-auto md:h-[30vh] border-2 my-4 mx-2 md:mx-20 rounded-lg shadow-2xl p-4"
        >
            <Image
                className="h-[20vh] md:h-auto w-full md:w-[20vw] object-contain"
                width={420}
                height={420}
                quality={100}
                src={order[k].image1}
                alt="Product Image 1"
            />
            <div className="flex flex-col w-full md:w-auto p-2">
                <p className="text-customPink text-2xl font-semibold mb-2">{order[k].name}</p>
                <div className="flex flex-col md:flex-row gap-10 text-xl mb-4">
                    <p className="mt-2">Rs. {order[k].price}</p>
                    <div className="flex items-center">
                        <p className="mt-2 mr-2">Quantity:</p>
                        <p className="mt-1 text-customPink">{order[k].qty}</p>
                    </div>
                    <p className="text-customPink font-semibold mt-2 md:ml-auto">
                        Total Price: ₹{(order[k].qty * order[k].price).toFixed(2)}
                    </p>
                </div>
                <div className="flex gap-10 mt-4">
                    <p>Ordered on {order[k].time}</p>
                    
                </div>
            </div>
        </div>
    ))}

    {Object.keys(order).length !== 0 && (
        <div className="flex justify-center border-2 border-customPink rounded-lg text-customPink hover:bg-customPink hover:text-white h-10 w-44 mx-auto font-semibold text-xl mt-10 my-10">
            <button >Clear order</button>
        </div>
    )}
</div>
  );
};

export default Order;
