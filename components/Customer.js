"use client"
import React, { useState, useEffect } from "react";
import styles from './Customer.css'; // Import your CSS styles
import Image from "next/image";
const Customer = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(0);
  const [animate, setAnimate] = useState(false);

  const customers = [
    { id: 1, name: "John", views:  ' "I love shopping here! The variety of styles and sizes available always ensures I find something that fits perfectly. Great experience every time. The quality of the clothes is excellent, and they always have the latest trends!""' },
    { id: 2, name: "Sarah", views: '"The customer service is outstanding. They helped me pick out a suit for a wedding, and I felt confident in my choice. I appreciate how easy it is to navigate the website. Finding what I want and checking out is a breeze."'},
    { id: 3, name: "David", views: '"I ve been shopping here for years. The loyalty rewards and occasional discounts make it worthwhile to keep coming back.I enjoy the eco-friendly options available here. It is nice to shop with a company that cares about sustainability"' },
    { id: 4, name: "Sophia", views: ' "The clothing is stylish and affordable. It is a great place to shop for both casual and formal wear.I love receiving updates on new arrivals. It keeps me excited about shopping and discovering new pieces."' },
  ];

  useEffect(() => {
    setAnimate(true); // Trigger animation on initial render
    const timeout = setTimeout(() => setAnimate(false), 500); // Reset animation after duration
    return () => clearTimeout(timeout); // Clear timeout if component unmounts
  }, [selectedCustomer]);

  const handleCustomerSelect = (customerIndex) => {
    setSelectedCustomer(customerIndex);
    setAnimate(false); // Reset animation before setting to true
  };

  return (
    <div>
      <h1 className="font-bold text-4xl text-customPink opacity-100 flex justify-center items-center my-12">Our Customers</h1>
      <div className="bg-pink-200 h-[40vh] w-[80vw] mx-auto my-4 rounded-xl flex flex-col justify-center items-center sm:flex-row">
        {selectedCustomer !== null && (
          <div className={`customer-info ${animate ? 'shock-animation' : ''} text-center p-4`}>
            <Image src="/invertedcomma.png" className="h-12 text-customPink w-12 mx-auto mt-6" width={20} height={20} alt="inverted comma"/>
            <p className="text-customPink font-semibold text-xl px-6 pt-12 line-clamp-4">{customers[selectedCustomer].views}</p>
            <p className="text-customPink opacity-100 font-semibold text-xl mt-4 uppercase">- {customers[selectedCustomer].name}</p>
          </div>
        )}
      </div>
      <div className="customers flex justify-center items-center mb-10 mt-10 gap-4 sm:gap-10">
        {customers.map((customer, index) => (
          <div
            key={customer.id}
            className={`bg-pink-300 opacity-60 h-[8vh] w-[8vw] sm:w-[4vw] rounded-lg flex justify-center items-center cursor-pointer ${
              selectedCustomer === index ? '-translate-y-1 border-2 border-black opacity-100' : ''
            }`}
            onClick={() => handleCustomerSelect(index)}
          >
            <lord-icon
              src="https://cdn.lordicon.com/hrjifpbq.json"
              trigger="hover"
              colors="primary: #000000"
              style={{ width: '8vw', height: '6vh' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
