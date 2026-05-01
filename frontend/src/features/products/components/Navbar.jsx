import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import Search from './Search';
import { useSelector } from 'react-redux';
import logo from "../../../../public/logo.png"

/* ─── Icons ──────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const CameraIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const UserIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const WishlistIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const BagIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

/* ─── Typewriter hook ────────────────────────────────────────── */
const WORDS = ['jerseys', 'tees', 'pants', 'hoodies', 'polos', 'tank tops'];

const useTypewriter = () => {
  const [charIndex, setCharIndex]   = useState(0);
  const [wordIndex, setWordIndex]   = useState(0);
  const [deleting,  setDeleting]    = useState(false);
  const [displayed, setDisplayed]   = useState('');

  useEffect(() => {
    const current = WORDS[wordIndex];
    let timeout;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex(i => i + 1);
      }, 100);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex(i => i - 1);
      }, 60);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex(i => (i + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return displayed;
};

/* ─── Typewriter Search Button ───────────────────────────────── */
const TypewriterSearch = ({ onOpen }) => {
  const word = useTypewriter();

  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2.5 border border-gray-300 rounded-full px-4 py-2 bg-white hover:border-gray-400 transition-colors"
      style={{ minWidth: 200 }}
    >
      <span className="text-gray-500 shrink-0"><SearchIcon /></span>
      <span className="text-[13px] text-gray-400 whitespace-nowrap flex items-center gap-0.5">
        Search for&nbsp;
        <span className="text-gray-600">{word}</span>
        <span
          className="inline-block w-[1.5px] h-3.5 bg-gray-500 ml-0.5 align-middle"
          style={{ animation: 'blink 1s step-end infinite' }}
        />
      </span>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </button>
  );
};

/* ─── Navbar ─────────────────────────────────────────────────── */
const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const cartItems = useSelector(state => state.cart?.items || []);
  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
    navigate(category ? `/?category=${category}` : '/');
  };

  return (
    <>
      {/* Thin black top bar — same as ONLY */}
      <div className="h-[3px] bg-black w-full" />

      <header className="bg-white sticky top-0 z-50">

        {/* ── Main header row ──────────────────────────────────── */}
        <div
          className="max-w-[1400px] mx-auto px-6 md:px-10 h-[64px]"
          style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}
        >
          {/* LEFT — intentionally empty (mirrors ONLY layout) */}
          <div />

          {/* CENTER — Logo */}
          <Link to="/">
            <span
              className="text-black select-none"
              style={{
                fontFamily: "Boldonse",
                fontWeight: 900,
                fontSize: '50px',
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}
            >
              ONLY
            </span>
          </Link>

          {/* RIGHT — search bar + icons */}
          <div className="flex items-center justify-end gap-4 text-gray-700">
            <TypewriterSearch onOpen={() => setSearchOpen(true)} />

            {/* Camera */}
            {/* <button className="hover:text-black transition-colors p-0.5" aria-label="Visual search">
              <CameraIcon />
            </button> */}

            {/* User */}
            <Link to="/login" className="hover:text-black transition-colors p-0.5" aria-label="Account">
              <UserIcon />
            </Link>

            {/* Wishlist with pink badge */}
            {/* <Link to="/wishlist" className="hover:text-black transition-colors p-0.5 relative" aria-label="Wishlist">
              <WishlistIcon />
              <span
                className="absolute -top-1.5 -right-1.5 text-white text-[9px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center leading-none"
                style={{ backgroundColor: '#e91e8c' }}
              >
                0
              </span>
            </Link> */}

            {/* Cart */}
            <Link to="/cart" className="hover:text-black transition-colors p-0.5 relative" aria-label="Cart">
              <BagIcon />
              {totalQty > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 text-white text-[9px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center leading-none"
                  style={{ backgroundColor: '#e91e8c' }}
                >
                  {totalQty}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ── Category nav ─────────────────────────────────────── */}
        <div className="border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 overflow-x-auto scrollbar-hide">
            <nav className="flex items-center justify-center gap-8 py-3 whitespace-nowrap">
              {navLinks.map((link) => {
                const isActive = link.category === null
                  ? activeCategory === null
                  : activeCategory === link.category;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.category)}
                    className={`text-[16px] font-semibold tracking-widest uppercase pb-0.5 border-b transition-colors ${
                      link.red
                        ? 'border-transparent hover:border-[#e91e8c]'
                        : isActive
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-600 hover:text-black hover:border-black'
                    }`}
                    style={link.red ? { color: '#e91e8c' } : {}}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ── Search overlay ───────────────────────────────────── */}
        {searchOpen && (
          <div className="absolute inset-x-0 top-0 bg-white border-b border-gray-200 z-50 shadow-sm">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex justify-center">
              <Search onClose={() => setSearchOpen(false)} />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;