import React, { useState } from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

const HeartIcon = ({ filled }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? '#4a7c59' : 'none'}
    stroke="#4a7c59"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();

  const wishlistItems = useSelector(state => state.wishlist?.items || []);
  const isWishlisted = wishlistItems.some(item => item._id === product._id);

  const img1 = product.images?.[0]?.url;
  const img2 = product.images?.[1]?.url;

  const handleWishlist = (e) => {
    e.preventDefault();   // prevent Link navigation
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="group flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden mb-3">

        {/* Product images */}
        {img1 ? (
          <>
            <img
              src={img1}
              alt={product.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                hovered && img2 ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {img2 && (
              <img
                src={img2}
                alt={product.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest font-bold">
            No Image
          </div>
        )}

        {/* Heart / wishlist button — top right, exactly like ONLY */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 z-10 p-1 transition-transform duration-150 hover:scale-110 active:scale-95"
        >
          <HeartIcon filled={isWishlisted} />
        </button>
      </div>

      {/* Title — UPPERCASE, centered, tracking-wide, same as ONLY */}
      <h3 className="text-[12px] md:text-[13px] font-medium text-gray-900 uppercase tracking-wider text-center leading-snug mb-1.5">
        {product.title}
      </h3>

      {/* Price — centered */}
      <p className="text-[12px] md:text-[13px] text-gray-800 text-center">
        ₹{' '}
        {Number(product.price?.amount).toLocaleString('en-IN', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}
      </p>
    </Link>
  );
};

export default ProductCard;