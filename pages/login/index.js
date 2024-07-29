// pages/login.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Loader from '@/components/Loader';

export const metadata = {
  title: "LooksLogin Page",
  description: "Find best styling products from here",
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/categories');
    }
  }, [router, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false); // Stop loading

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/categories'); // Redirect to the dashboard or any other page on successful login
      window.location.reload();
    }
  };

  return (
    <>
      <Head>
        <title>Login for better experience</title>
        <meta name="description" content="Contact us to learn more about our clothing products." />
      </Head>
      <div className="bg-pink-200 py-6 w-1/2 mx-auto h-[45vh] my-4 flex flex-col items-center rounded-lg">
        <div className="text-center mb-8">
          <h1 className="font-bold text-4xl py-2">LOGIN</h1>
        </div>
        <div className="container max-w-md w-full p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 rounded-xl p-1 text-black px-2 bg-none border-customPink focus:border-customPink focus:outline-customPink"
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded-xl p-1 text-black px-2 bg-none border-customPink focus:border-customPink focus:outline-customPink"
              required
            />
            <button
              type="submit"
              className="border-pink-400 border-2 mb-4 p-2 font-semibold text-lg text-white cursor-pointer bg-customPink rounded-xl"
            >
              Login
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      {loading && <Loader />} {/* Display loader when loading */}
    </>
  );
};

export default Login;
