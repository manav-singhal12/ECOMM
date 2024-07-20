import React from 'react'
import Image from 'next/image'
import { Toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
const favourite = ({ cart, addToCart, removeFromCart, clearCart, subTotal, removeCart,addItem
}) => {


    // console.log(cart[k].image1)
    return (<>
        <div>
            <div>{Object.keys(cart).length === 0 && <p1 className='flex justify-center items-center my-4 text-xl font-semibold text-customPink'>No items in the cart</p1>}

                {Object.keys(cart).map((k) => (
                    <div key={k} className="flex flex-col md:flex-row gap-14 h-auto md:h-[30vh] border-2 my-4 mx-2 md:mx-20 rounded-lg shadow-2xl p-4">
                        <Image
                            className="h-[20vh] md:h-auto w-full md:w-[20vw] object-contain"
                            width={420}
                            height={420}
                            quality={100}
                            src={cart[k].image1}
                            alt="Product Image 1"
                        />
                        <div className="flex flex-col w-full md:w-auto p-2">
                            <p className='text-customPink text-2xl font-semibold mb-2'>{cart[k].name}</p>
                            <div className="flex flex-col md:flex-row gap-10 text-xl mb-4">
                                <p className='mt-2'>Rs. {cart[k].price}</p>
                                <div className='flex items-center'>
                                    <p className='mt-2 mr-2'>Quantity:</p>
                                    <button
                                        className='text-customPink text-3xl font-semibold flex justify-center items-center mx-2'
                                        onClick={() => { removeFromCart(k, 1, cart[k].description, cart[k].price, cart[k].name, cart[k].size, cart[k].color, cart[k].image1) }}
                                    >
                                        -
                                    </button>
                                    <p className='mt-1 text-customPink'>{cart[k].qty}</p>
                                    <button
                                        className='text-customPink text-3xl font-semibold flex justify-center items-center mx-2'
                                        onClick={() => { addItem(k, cart[k].qty+1) }}
                                    >
                                        +
                                    </button>
                                </div>
                                <p className='text-customPink font-semibold mt-2 md:ml-auto'>Total Price: ₹{(cart[k].qty * cart[k].price).toFixed(2)}</p>
                            </div>
                            <button
                                className='text-xl font-semibold border-2 border-customPink rounded-md p-2 text-customPink hover:bg-customPink hover:text-white my-2 w-full md:w-60'
                                onClick={() => { removeCart(k) }}
                            >
                                Remove From Cart
                            </button>
                        </div>
                    </div>
                ))}
                {Object.keys(cart).length !== 0 && <div className="flex justify-center border-2 border-customPink rounded-lg text-customPink hover:bg-customPink hover:text-white h-10 w-44 mx-auto font-semibold text-xl mt-10 my-10">
                <button onClick={clearCart}>Clear Cart</button>

            </div>}
            </div>
            
        </div></>
    )
}

export default favourite
