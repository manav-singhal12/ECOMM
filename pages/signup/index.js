import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

export const metadata = {
  title: "Looks-Signup Page",
  description: "Find best styling products from here",
};

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ name: '', email: '', password: '' });
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ name: '', email: '', password: '' });

    if (name.length < 4) {
      setError(prev => ({ ...prev, name: 'Username must be at least 4 characters long' }));
      return;
    }

    if (password.length < 8) {
      setError(prev => ({ ...prev, password: 'Password must be at least 8 characters long' }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.endsWith('@looks')) {
      setError(prev => ({ ...prev, email: 'Invalid email format or email ends with @looks' }));
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
        router.push('/cart'); // Redirect to cart on successful signup and signin
      } else {
        console.error('Error signing in:', signInResponse.error);
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
      if (error.message.includes('User already exists')) {
        setError(prev => ({ ...prev, email: error.message }));
      } else {
        setError(prev => ({ ...prev, general: error.message }));
      }
    }
  };

  useEffect(() => {
    if (session) {
      router.push('/cart');
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
          {/* <div className="border-t-2 border-black opacity-50 w-full max-w-md mx-auto text-center mb-2"></div>
          <div className="mx-auto p-2 text-xl mb-3 pb-3 text-center">OR</div>
          <div className="flex flex-col gap-3 justify-center items-center w-full max-w-md">
            <button
              type="button"
              className="text-white mb-6 focus:border-customPink focus:outline-customPink gap-3 w-full bg-customPink focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"
              onClick={() => signIn("google")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={16} viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
              Continue with Google
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Signup;
