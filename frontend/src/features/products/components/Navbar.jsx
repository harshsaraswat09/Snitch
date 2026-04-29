import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import Search from './Search';


import { useSelector } from 'react-redux';

/* ─── Inline SVG Icons ──────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const UserIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const CartIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const cartItems = useSelector(state => state.cart?.items || []);

  const navLinks = [
    { name: 'Home', category: null },
    { name: 'Jerseys', category: 'jerseys' },
    { name: 'Tees', category: 'tees' },
    { name: 'Pants', category: 'pants' },
    { name: 'Hoodies', category: 'hoodies' },
    { name: 'Polos', category: 'polos' },
    { name: 'Tank Tops', category: 'tanktops' },
  ];

  const handleNavClick = (category) => {
    if (category) {
      navigate(`/?category=${category}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {isSearchOpen ? (
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex justify-center">
          <Search onClose={() => setIsSearchOpen(false)} />
        </div>
      ) : (
        <>
          <div className="max-w-350 mx-auto px-4 md:px-8 h-14 flex items-center justify-between relative">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 hover:text-black transition-colors p-1"
            >
              <SearchIcon />
            </button>
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <div className="flex border-2 border-black select-none text-md font-black uppercase tracking-[-0.02em]">
                <span className="bg-black text-white px-1 ">URBAN</span>
                <span className="bg-white text-black px-1">NEEDS</span>
              </div>
            </Link>
            <div className="flex items-center gap-4 text-gray-700">
              <Link to="/login" className="hover:text-black transition-colors p-1"><UserIcon /></Link>
              <Link to="/cart" className="hover:text-black transition-colors p-1 relative">
                <CartIcon />
                {cartItems?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <nav className="hidden md:flex max-w-[1400px] w-full mx-auto px-8 overflow-x-auto scrollbar-hide justify-center">
            <div className="flex items-center justify-center gap-8 py-2.5 text-[13px] font-bold text-gray-600 whitespace-nowrap">
              {navLinks.map((link) => {
                const isActive = link.category === null
                  ? activeCategory === null
                  : activeCategory === link.category;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.category)}
                    className={`pb-2 border-b-2 transition-colors ${
                      isActive
                        ? 'border-black text-black'
                        : 'border-transparent hover:text-black hover:border-gray-400'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Navbar;
