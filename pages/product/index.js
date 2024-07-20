"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import productsData from '@/public/products.json'; // Assuming this path is correct
import Head from 'next/head';
export const metadata = {
  title: "Looks-Product",
  description: "Find best styling products from here",
};
const ProductsPage = () => {
  // State to manage categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract unique categories from productsData
    if (Array.isArray(productsData)) {
      const uniqueCategories = [...new Set(productsData.map(product => product.category))];
      setCategories(uniqueCategories);
    } else {
      console.error("productsData is not an array", productsData);
    }
  }, []);

  return (
    <div><Head>
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
