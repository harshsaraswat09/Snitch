import React, { useState } from 'react';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const img1 = product.images?.[0]?.url;
  const img2 = product.images?.[1]?.url;

  return (
    <Link
      to={`/product/${product._id}`}
      className="group flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
        {img1 ? (
          <>
            <img
              src={img1}
              alt={product.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered && img2 ? 'opacity-0' : 'opacity-100'}`}
            />
            {img2 && (
              <img
                src={img2}
                alt={product.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest font-bold">
            No Image
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-[13px] md:text-[14px] font-semibold text-gray-900 group-hover:underline underline-offset-2 leading-snug mb-1 capitalize">
        {product.title}
      </h3>
      <p className="text-[13px] md:text-[14px] text-gray-800">
        Rs.{' '}
        {Number(product.price?.amount).toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </Link>
  );
};

export default ProductCard;
