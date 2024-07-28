import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            axios.get('/api/order/get')
                .then(response => {
                    
                    setOrders(response.data.order || {});
                    console.log(response.data.order);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                });
        }
    }, [session]);
    const orderList = Array.isArray(orders) ? orders : Object.values(orders);
console.log(orderList);    
    return (
      <>
          <Head>
              <title>Your Orders</title>
              <meta name="description" content="View your order history." />
          </Head>
          <div>
              <h1 className="text-2xl font-semibold text-center my-4">Your Orders</h1>
              {orderList.length === 0 && (
                  <p className="flex justify-center orders-center my-4 text-xl font-semibold text-customPink">
                      No orders found.
                  </p>
              ) }
                {Object.keys(orders).map((key) => {
                    const item = orders[key];
                    return (
                        <div
                            key={key}
                            className="flex fl md:flex-row gap-14 h-auto md:h-[30vh] border-2 my-4 mx-2 md:mx-20 rounded-lg shadow-2xl p-4"
                        >
                            <Image
                                className="h-[20vh] md:h-auto w-full md:w-[20vw] object-contain"
                                width={420}
                                height={420}
                                quality={100}
                                src={item.image1}
                                alt="Product Image"
                            />
                            <div className="flex flex-col w-full md:w-auto p-2">
                                <p className="text-customPink text-2xl font-semibold mb-2">{item.name}</p>
                                <div className="flex flex-col md:flex-row gap-10 text-xl mb-4">
                                    <p className="mt-2">Rs. {item.price}</p>
                                    <div className="flex orders-center">
                                        <p className="mt-2 mr-2">Quantity:</p>
                                        
                                        <p className="mt-1 text-customPink">{item.qty}</p>
                                        
                                    </div>
                                    <p className="text-customPink font-semibold mt-2 md:ml-auto">
                                        Total Price: ₹{(item.qty * item.price).toFixed(2)}
                                    </p>
                                </div>
                                <p>Ordered on {item.time}</p>
                            </div>
                        </div>
                    );
                })}
              <div className="flex justify-center my-4">
                  <Link href="/categories" className="bg-blue-500 text-white px-4 py-2 rounded">
                      Continue Shopping
                  </Link>
              </div>
          </div>
      </>
  );
};

export default Orders;
