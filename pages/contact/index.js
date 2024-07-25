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
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Contact Us</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-lg font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-customPink"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-customPink"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-lg font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-customPink"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-customPink text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-opacity-80 transition duration-300"
              >
                Send Message
              </button>
              {submitted && (
                <p className="mt-4 text-green-600 font-medium text-center">Your message has been sent!</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
