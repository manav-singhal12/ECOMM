"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import productsData from '@/public/products.json';
import '@/app/globals.css';

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(productsData)) {
      const uniqueCategories = ['all', ...new Set(productsData.map((product) => product.category))];
      setCategories(uniqueCategories);
      setFilteredProducts(productsData);
    } else {
      console.error("productsData is not an array", productsData);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(productsData);
    } else {
      setFilteredProducts(productsData.filter((product) => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-4 ">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white  rounded-lg overflow-hidden shadow-2xl   border-2 ">
              <Link href={`/product/${product.id}`}>
                <div>
                  <Image
                    className="object-cover w-full h-64"
                    src={product.image1}
                    alt={product.name}
                    width={640}
                    height={480}
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <class12 className="block text-xl font-semibold text-gray-800  hover:text-customPink">{product.name}</class12>
                </Link>
                <div className="flex justify-between">
                <div className='text-xl text-pink-500 font-semibold'>₹{product.price}</div>

<div className='flex items-center'>
        <p className='text-sm line-through text-gray-500 mr-2'>₹{product.originalPrice}</p>
        <span className='bg-yellow-500 text-white px-2 py-1 rounded-md text-xs'>{product.discount}% off</span>
      </div>
</div>
                </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No products found</p>
        )}
      </div>
    </div>
  );
}
