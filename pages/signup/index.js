import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Loader from '@/components/Loader';

export const metadata = {
  title: "Looks-Signup Page",
  description: "Find best styling products from here",
};

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ name: '', email: '', password: '', general: '' });
  const [loading, setLoading] = useState(false); // Loader state
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ name: '', email: '', password: '', general: '' });
    setLoading(true); // Start loading

    if (name.length < 4) {
      setError(prev => ({ ...prev, name: 'Username must be at least 4 characters long' }));
      setLoading(false); // Stop loading
      return;
    }

    if (password.length < 8) {
      setError(prev => ({ ...prev, password: 'Password must be at least 8 characters long' }));
      setLoading(false); // Stop loading
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.endsWith('@looks')) {
      setError(prev => ({ ...prev, email: 'Invalid email format or email ends with @looks' }));
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register user');
      }

      // Sign in the user after successful registration
      const signInResponse = await signIn('credentials', {
        redirect: false, // Don't redirect, handle redirect manually after successful signin
        email,
        password,
      });

      if (signInResponse.ok) {
        router.push('/categories'); // Redirect to cart on successful signup and signin
        window.location.reload();
      } else {
        console.error('Error signing in:', signInResponse.error);
        setError(prev => ({ ...prev, general: 'Failed to sign in' }));
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
      if (error.message.includes('User already exists')) {
        setError(prev => ({ ...prev, email: error.message }));
      } else {
        setError(prev => ({ ...prev, general: error.message }));
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (session) {
      router.push('/categories');
    }
  }, [router, session]);

  return (
    <>
      <Head>
        <title>Signup for better experience</title>
        <meta name="description" content="Contact us to learn more about our clothing products." />
      </Head>
      <div className="bg-pink-200 w-1/2 justify-center mx-auto my-4 h-[60vh] py-6 flex flex-col items-center rounded-lg">
        <div className="text-center mb-8">
          <h1 className="font-bold text-4xl py-2">SIGN UP</h1>
        </div>
        <div className="container max-w-md w-full p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 rounded-xl p-1 text-black px-2 bg-none border-customPink focus:border-customPink focus:outline-customPink"
              />
              {error.name && <p className="text-red-500">{error.name}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 rounded-xl p-1 text-black px-2 bg-none border-customPink focus:border-customPink focus:outline-customPink"
              />
              {error.email && <p className="text-red-500">{error.email}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 rounded-xl p-1 text-black px-2 bg-none border-customPink focus:border-customPink focus:outline-customPink"
              />
              {error.password && <p className="text-red-500">{error.password}</p>}
            </div>
            {error.general && <p className="text-red-500">{error.general}</p>}
            <input
              type="submit"
              className="border-pink-400 border-2  p-2 font-semibold text-lg text-white cursor-pointer bg-customPink rounded-xl"
            />
          </form>
        </div>
      </div>
      {loading && <Loader />} {/* Display loader when loading */}
    </>
  );
};

export default Signup;
