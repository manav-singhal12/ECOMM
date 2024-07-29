import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const { data: session,status } = useSession();
  const router = useRouter();

    useEffect(() => {
        if (!session && status !== "loading") {
          router.push('/signup');
        }
      }, [router, session, status]);
    useEffect(() => {
        if (session && session.user.email) {
            axios.get('/api/order/get', { params: { user_email: session.user.email } })
                .then(response => {
                    setOrders(response.data.order || {}); // Ensure cart is an object
                    setLoading(false); // Set loading to false once data is fetched
                    console.log(session.user.email);
                    console.log(response.data.order);
                })
                .catch(error => {
                    console.error('Error fetching cart:', error);
                    setLoading(false); // Set loading to false on error
                });
        }
    }, [session]);

    const orderList = Array.isArray(orders) ? orders : Object.values(orders);

    return (
        <>
            <Head>
                <title>Your Orders</title>
                <meta name="description" content="View your order history." />
            </Head>
            <div className='min-h-[90vh]'>
                <h1 className="text-2xl font-semibold text-center my-4">Your Orders</h1>
                
                {loading ? (
                    <div className="flex justify-center items-center min-h-[60vh]">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <>
                        {orderList.length === 0 && (
                            <p className="flex justify-center orders-center my-4 text-xl font-semibold text-customPink">
                                No orders found.
                            </p>
                        )}
                        {Object.keys(orders).map((key) => {
                            const item = orders[key];
                            return (
                                <div
                                    key={key}
                                    className="flex fl md:flex-row gap-14 h-[10vh] md:h-[30vh] border-2 my-4 mx-2 md:mx-20 rounded-lg shadow-2xl p-4"
                                >
                                    <Image
                                        className="h-[10vh] md:h-auto w-full md:w-[20vw] object-contain"
                                        width={200}
                                        height={200}
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
                                        <p>Ordered on {item.date}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}

                <div className="flex justify-center my-4">
                    <Link href="/categories" className="buynow h-10 border-2 flex justify-center items-center border-customPink text-lg text-customPink font-semibold hover:bg-customPink hover:text-white cursor-pointe mx-auto w-44 rounded-lg">
                        Continue Shopping
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .loader {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    border-radius: 50%;
                    border-top: 4px solid #3498db;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
};

export default Orders;
