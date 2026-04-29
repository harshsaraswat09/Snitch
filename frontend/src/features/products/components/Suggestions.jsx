import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

const Suggestions = ({ category, currentProductId }) => {
  const products = useSelector(state => state.product.products || []);

  // Filter products by the same category, excluding the current product.
  // We limit to 4 suggestions.
  const suggestedProducts = products
    .filter(product => product.category === category && product._id !== currentProductId)
    .slice(0, 4);

  if (suggestedProducts.length === 0) {
    return null; // Return null if there are no suggestions found.
  }

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 bg-[#f4f4f4] py-12 mt-8 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8">
          {suggestedProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
