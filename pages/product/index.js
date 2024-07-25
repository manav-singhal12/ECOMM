"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import productsData from '@/public/products.json'; // Assuming this path is correct
import productswholesaleData from '@/public/productswholesale.json';
import { useSession } from 'next-auth/react';

export const metadata = {
  title: "Looks-Product",
  description: "Find best styling products from here",
};

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const { data: session } = useSession(); // Access session data

  useEffect(() => {
    // Determine the product data based on the session user name
    const productData = session?.user?.email?.endsWith('@looks') ? productswholesaleData : productsData;

    // Extract unique categories from the selected product data
    if (Array.isArray(productData)) {
      const uniqueCategories = [...new Set(productData.map(product => product.category))];
      setCategories(uniqueCategories);
    } else {
      console.error("productData is not an array", productData);
    }
  }, [session]);

  return (
    <div>
      <Head>
        <title>Explore the product</title>
        <meta name="description" content="Contact us to learn more about our clothing products." />
      </Head>
      <h1>All Products</h1>
      <ul>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li key={index}>
              <Link href={`/products/${encodeURIComponent(category)}`}>
                {category}
              </Link>
            </li>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </ul>
    </div>
  );
};

export default ProductsPage;
