import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
export const metadata = {
    title: "Looks-Your cart",
    description: "Find best styling products from here",
  };
const Cart = () => {
    const [cart, setCart] = useState({});
    const [subTotal, setSubTotal] = useState(0);

    

    

   
    useEffect(() => {
        try {
            if (localStorage.getItem('cart')) {
                setCart(JSON.parse(localStorage.getItem('cart')));
            }
        } catch (error) {
            console.error(error);
            localStorage.clear();
        }
    }, []);

    const saveCart = (myCart) => {
        localStorage.setItem('cart', JSON.stringify(myCart));
        let subt = 0;
        let keys = Object.keys(myCart);
        for (let i = 0; i < keys.length; i++) {
            subt += myCart[keys[i]].price * myCart[keys[i]].qty;
        }
        setSubTotal(subt);
    };

    const addItem = (itemcode, qty) => {
        let myCart = JSON.parse(JSON.stringify(cart));

        if (itemcode in myCart) {
            myCart[itemcode].qty = myCart[itemcode].qty + 1;
        } else {
            myCart[itemcode] = { qty: qty }; // Initialize the item if it doesn't exist
        }

        setCart(myCart);
        saveCart(myCart);
    };

    const removeFromCart = (itemcode, qty, description, price, name, size, variant, image1) => {
        let myCart = JSON.parse(JSON.stringify(cart));
        if (itemcode in cart) {
            myCart[itemcode].qty = cart[itemcode].qty - 1;
        }
        if (myCart[itemcode].qty <= 0) {
            delete myCart[itemcode];
        }
        setCart(myCart);
        saveCart(myCart);
    };

    const removeCart = (itemcode) => {
        let myCart = JSON.parse(JSON.stringify(cart));
        delete myCart[itemcode];
        setCart(myCart);
        saveCart(myCart);
        toast('Product Removed Successfully', {
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
    };

    const clearCart = () => {
        setCart({});
        saveCart({});
        toast('All items removed', {
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
    };

    return (
        <><Head>
        <title>Your Cart</title>
        <meta name="description" content="Contact us to learn more about our clothing products." />
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
            <div>
                {Object.keys(cart).length === 0 && (
                    <p1 className="flex justify-center items-center my-4 text-xl font-semibold text-customPink">
                        No items in the cart
                    </p1>
                )}

                {Object.keys(cart).map((k) => (
                    <div
                        key={k}
                        className="flex flex-col md:flex-row gap-14 h-auto md:h-[30vh] border-2 my-4 mx-2 md:mx-20 rounded-lg shadow-2xl p-4"
                    >
                        <Image
                            className="h-[20vh] md:h-auto w-full md:w-[20vw] object-contain"
                            width={420}
                            height={420}
                            quality={100}
                            src={cart[k].image1}
                            alt="Product Image 1"
                        />
                        <div className="flex flex-col w-full md:w-auto p-2">
                            <p className="text-customPink text-2xl font-semibold mb-2">{cart[k].name}</p>
                            <div className="flex flex-col md:flex-row gap-10 text-xl mb-4">
                                <p className="mt-2">Rs. {cart[k].price}</p>
                                <div className="flex items-center">
                                    <p className="mt-2 mr-2">Quantity:</p>
                                    <button
                                        className="text-customPink text-3xl font-semibold flex justify-center items-center mx-2"
                                        onClick={() =>
                                            removeFromCart(
                                                k,
                                                1,
                                                cart[k].description,
                                                cart[k].price,
                                                cart[k].name,
                                                cart[k].size,
                                                cart[k].color,
                                                cart[k].image1
                                            )
                                        }
                                    >
                                        -
                                    </button>
                                    <p className="mt-1 text-customPink">{cart[k].qty}</p>
                                    <button
                                        className="text-customPink text-3xl font-semibold flex justify-center items-center mx-2"
                                        onClick={() => addItem(k, cart[k].qty + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-customPink font-semibold mt-2 md:ml-auto">
                                    Total Price: ₹{(cart[k].qty * cart[k].price).toFixed(2)}
                                </p>
                            </div>
                            <div className="flex gap-10 mt-4">
                                <button
                                    className="text-xl font-semibold border-2 border-customPink rounded-md p-2 text-customPink hover:bg-customPink hover:text-white my-2 w-full md:w-60"
                                    onClick={() => removeCart(k)}
                                >
                                    Remove From Cart
                                </button>
                                <Link
                                    href={{
                                        pathname: '/order',
                                        query: {
                                            itemcode: k,
                                            qty: cart[k].qty,
                                            description: cart[k].description,
                                            price: cart[k].price,
                                            name: cart[k].name,
                                            size: 'S', // Example size, adjust as needed
                                            variant: 'M', // Example variant, adjust as needed
                                            image1: cart[k].image1,
                                            total:cart[k].qty*cart[k].price
                                        },
                                    }}
                                    passHref
                                >
                                    <span className="text-xl font-semibold border-2 flex justify-center border-customPink rounded-md p-2 text-customPink hover:bg-customPink hover:text-white my-2 w-full md:w-60">
                                        Buy Now
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {Object.keys(cart).length !== 0 && (
                    <div className="flex justify-center border-2 border-customPink rounded-lg text-customPink hover:bg-customPink hover:text-white h-10 w-44 mx-auto font-semibold text-xl mt-10 my-10">
                        <button onClick={clearCart}>Clear Cart</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
