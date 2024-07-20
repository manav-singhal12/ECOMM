// pages/ContactUs.js
import Head from 'next/head';
import { useState } from 'react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (replace with actual logic)
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(true);
    }, 1000); // Simulating a delay for demo purposes
  };

  return (
    <>
      <Head>
        <title>Contact Us - Your Clothing Website</title>
        <meta name="description" content="Contact us to learn more about our clothing products." />
      </Head>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-12">
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold mb-6 text-center">Contact Us</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-customPink"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-customPink"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-customPink"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-customPink text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-300"
              >
                Send Message
              </button>
              {submitted && (
                <p className="mt-2 text-green-600 font-semibold text-center">Your form has been submitted!</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
