import React, { useEffect, useState, useMemo } from 'react';
import { useProducts } from '../hook/useProducts';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import ProductCard from '../components/ProductCard';

/* ─── Home Page ─────────────────────────────────────────────── */
const Home = () => {
  const { handleGetAllProducts } = useProducts();
  const products = useSelector(state => state.product.products);
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const displayProducts = useMemo(() => {
    if (!products) return [];
    if (!activeCategory) return products;
    return products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());
  }, [products, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-8 pb-20">
        {/* Section heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[15px] font-bold uppercase tracking-widest text-black">
            {activeCategory ? activeCategory : 'All Products'}
          </h2>
          <span className="text-xs text-gray-400 font-medium">
            {displayProducts?.length || 0} items
          </span>
        </div>

        {/* Grid */}
        {(!displayProducts || displayProducts.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-40 text-gray-400 gap-3">
            <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
            <p className="text-sm tracking-wide">No products available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-5 md:gap-y-12">
            {displayProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;