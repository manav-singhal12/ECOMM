// pages/category/[category].js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import productsData from '@/public/products.json';
import '@/app/globals.css';
import Image from 'next/image';
export const metadata = {
  title: "Looks-Explore Categories",
  description: "Find best styling products from here",
};
export default function CategoryDetailPage() {
  const router = useRouter();
  const { category } = router.query; // Extract the category from the query parameters
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Initialize categories and filtered products on component mount
    if (Array.isArray(productsData)) {
      const uniqueCategories = ['All', ...new Set(productsData.flatMap((product) => product.category))];
      setCategories(uniqueCategories);
      setFilteredProducts(productsData);
    } else {
      console.error("productsData is not an array", productsData);
    }
  }, []);

  useEffect(() => {
    // Ensure category is defined and a string
    if (typeof category === 'string' && category.trim() !== '') {
      // Filter products based on the category parameter
      const filtered = productsData.filter((product) => product.category.includes(category));
      setFilteredProducts(filtered);
    } else {
      // If category is not defined or empty, reset filtered products to show All
      setFilteredProducts(productsData);
    }
  }, [category]);

  // Handle initial loading state or undefined category
  if (!category) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex'>
      {/* Sidebar for categories */}
      <div className='w-1/4 border-r-2 border-2 m-2 border-gray-500'>
        <h1 className='font-semibold text-xl text-center py-4'>Categories</h1>
        <ul className='space-y-2'>
          {categories.map((cat) => (
            <li key={cat} onClick={() => setSelectedCategory(cat)}>
              <Link href={cat === 'All' ? '/categories' : `/categories/${cat}`} passHref>
                <div className={`block py-2 px-4 rounded-lg text-lg cursor-pointer ${selectedCategory === cat ? 'bg-pink-500 text-white' : 'hover:bg-gray-200'}`}>
                  {cat}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content area for products */}
      <div className='w-3/4 p-8'>
        <h1 className='text-2xl font-semibold mb-4'>Products in {category}</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className='border border-gray-500 rounded-lg p-4'>
                <div className='relative h-60'>
                  <Image src={product.image1} alt={product.name} layout='fill' objectFit='cover' className='rounded-lg' />
                </div>
                <div className='mt-4'>
                  <Link href={`/product/${product.id}`}>
                    <div className='text-lg font-semibold hover:text-customPink'>{product.name}</div>
                  </Link>
                  <div className='flex justify-between items-center mt-2'>
                    <p className='text-xl text-pink-500 font-semibold'>₹{product.price}</p>
                    {product.discount > 0 && (
                      <div className='flex items-center'>
                        <p className='text-sm line-through text-gray-500 mr-2'>₹{product.originalPrice}</p>
                        <span className='bg-yellow-500 text-white px-2 py-1 rounded-md text-xs'>{product.discount}% off</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-lg text-gray-500'>No products found in {category}</p>
          )}
        </div>
      </div>
    </div>
  );
}
