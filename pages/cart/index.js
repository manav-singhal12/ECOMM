import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export const metadata = {
    title: "Looks - Your Cart",
    description: "Find best styling items from here",
};

const Cart = () => {
    const [cart, setCart] = useState({}); // Initialize cart as an empty object
    const [subTotal, setSubTotal] = useState(0);
    const { data: session } = useSession();

    useEffect(() => {
        if (session && session.user.email) {
            axios.get('/api/cart/get', { params: { user_email: session.user.email } })
                .then(response => {
                    setCart(response.data.cart || {}); // Ensure cart is an object
                    // calculateSubtotal(response.data.items || {});
                    console.log(session.user.email);
                    console.log(response.data.cart);
                    // setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching cart:', error);
                    // setLoading(false);
                });
        }
    }, [session]);

    // const calculateSubtotal = (cart) => {
    //     let subt = 0;
    //     Object.values(cart).forEach(item => {
    //         subt += item.price * item.qty;
    //     });
    //     setSubTotal(subt);
    // };

    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart));
      };
    
      const addToCart = async (itemcode, qty, description, price, name, size, variant, image1) => {
        const updatedCart = { ...cart };
        const increment = session?.user?.email?.endsWith("_looks") ? 5 : 1;
        
        if (itemcode in updatedCart) {
            updatedCart[itemcode].qty += increment;
        } else {
            updatedCart[itemcode] = { qty: increment, price, name, image1 };
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
                    // Handle success if needed
                } else {
                    const data = await response.json();
                    // Handle error if needed
                }
            } catch (error) {
                console.error('Failed to save cart:', error);
            }
        }
    };
    
    const removefromCart = async (itemcode, qty, description, price, name, size, variant, image1) => {
        const updatedCart = { ...cart };
        const decrement = session?.user?.email?.endsWith("_looks") ? 5 : 1;
    
        if (itemcode in updatedCart) {
            updatedCart[itemcode].qty = Math.max(updatedCart[itemcode].qty - decrement, 0);
            if (updatedCart[itemcode].qty === 0) {
                delete updatedCart[itemcode];
            }
        } else {
            updatedCart[itemcode] = { qty: Math.max(qty - decrement, 0), price, name, image1 };
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
                    // Handle success if needed
                } else {
                    const data = await response.json();
                    // Handle error if needed
                }
            } catch (error) {
                console.error('Failed to save cart:', error);
            }
        }
    };
    
    
    const removeItem = async (itemcode, qty, description, price, name, size, variant, image1) => {
        const updatedCart = { ...cart };
        
        if (itemcode in updatedCart) {
            updatedCart[itemcode].qty = 0;
            delete updatedCart[itemcode];
        } else {
            updatedCart[itemcode] = { qty, price, name, image1 };
        }
        
        setCart(updatedCart);
        saveCart(updatedCart);
    
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
                    toast('Item removed from cart', {
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
    };
    
    

      const clearCart = async () => {
        const emptyCart = {};
        setCart(emptyCart);
        saveCart(emptyCart);
    
        if (session?.user?.email) {
            try {
                const response = await fetch('/api/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_email: session.user.email,
                        cart: emptyCart,
                    }),
                });
    
                if (response.ok) {
                    setCart(emptyCart);
                    setSubTotal(0);
                    toast('All items removed from cart', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                        transition: Bounce,
                    });
                } else {
                    const data = await response.json();
                    toast.error(`Failed to clear cart: ${data.message}`, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        transition: Bounce,
                    });
                }
            } catch (error) {
                console.error('Error clearing cart:', error);
                toast.error('Failed to clear cart.', {
                    position: 'top-right',
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
                <title>Your Cart</title>
                <meta name="description" content="View and manage your cart." />
            </Head>
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
            <div className='min-h-[90vh]'> 
                {Object.keys(cart).length === 0 && (
                    <p className="flex justify-center cart-center my-4 text-xl font-semibold text-customPink">
                        No items in the cart
                    </p>
                )}

                {Object.keys(cart).map((key) => {
                    const item = cart[key];
                    return (
                        <div
                            key={key}
                            className="flex flex-col md:flex-row gap-14 h-auto md:h-[30vh] border-2 my-4 mx-2 md:mx-20 rounded-lg shadow-2xl p-4"
                        >
                            <Image
                                className="h-[20vh] md:h-auto w-full md:w-[20vw] object-contain"
                                width={420}
                                height={420}
                                quality={100}
                                src={item.image1}
                                alt="item Image"
                            />
                            <div className="flex flex-col w-full md:w-auto p-2">
                                <p className="text-customPink text-2xl font-semibold mb-2">{item.name}</p>
                                <div className="flex flex-col md:flex-row gap-10 text-xl mb-4">
                                    <p className="mt-2">Rs. {item.price}</p>
                                    <div className="flex cart-center">
                                        <p className="mt-2 mr-2">Quantity:</p>
                                        <button
                                            className="text-customPink text-3xl font-semibold flex justify-center cart-center mx-2"
                                            onClick={() => removefromCart(key, item.qty, item.description, item.price, item.name, "S", "M", item.image1)}
                                        >
                                            -
                                        </button>
                                        <p className="mt-1 text-customPink">{item.qty}</p>
                                        <button
                                            className="text-customPink text-3xl font-semibold flex justify-center cart-center mx-2"
                                            onClick={() => addToCart(key, item.qty, item.description, item.price, item.name, "S", "M", item.image1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-customPink font-semibold mt-2 md:ml-auto">
                                        Total Price: ₹{(item.qty * item.price).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex w-full justify-between">
                                <button
                                    onClick={() => removeItem(key, item.qty, item.description, item.price, item.name, "S", "M", item.image1)}
                                    className="bg-red-500 text-white py-2 px-4 rounded mt-2"
                                >
                                    Remove Item
                                </button>
                                <Link
                href={{
                  pathname: '/order',
                  query: {
                    itemcode: item.id,
                    qty: item.qty,
                    description: item.description,
                    price: item.price,
                    name: item.name,
                    size: 'S', // Example size, adjust as needed
                    variant: 'M', // Example variant, adjust as needed
                    image1: item.image1,
                  },
                }}
                passHref
              >
                <button className='bg-green-500 text-white py-2 px-4 rounded mt-2'>Buy Now</button>
              </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {Object.keys(cart).length > 0 && (
                    <div className="flex justify-center h-16  mx-2 md:mx-20 mt-6">
                        <button
                            onClick={clearCart}
                            className="bg-red-500 text-white py-2 px-4 rounded"
                        >
                            Clear Cart
                        </button></div>)}

                {/* {Object.keys(cart).length > 0 && (
                    <div className="flex justify-between mx-2 md:mx-20 mt-4">
                        <button
                            onClick={clearCart}
                            className="bg-red-500 text-white py-2 px-4 rounded"
                        >
                            Clear Cart
                        </button>
                        <div className="text-xl font-semibold">
                            <p>Subtotal: ₹{subTotal.toFixed(2)}</p>
                            <Link href="/checkout"
                                className="bg-green-500 text-white py-2 px-4 rounded mt-2 inline-block">Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )} */}
            </div>
        </>
    );
};

export default Cart;
