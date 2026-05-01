import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';

/* ─── Debounce hook ─────────────────────────────────────────── */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

/* ─── Typewriter hook (same as Navbar) ──────────────────────── */
const WORDS = ['jerseys', 'tees', 'pants', 'hoodies', 'polos', 'tank tops'];

const useTypewriter = () => {
  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting,  setDeleting]  = useState(false);
  const [displayed, setDisplayed] = useState('');

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

/* ─── Icons ─────────────────────────────────────────────────── */
const ClearIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6"/>
  </svg>
);
const SearchMagnifyIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>
);

/* ─── Search Component ──────────────────────────────────────── */
const Search = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const word = useTypewriter();

  const debouncedQuery = useDebounce(query, 300);
  const activeQuery = debouncedQuery.trim();

  const products = useSelector(state => state.product?.products) || [];

  const filteredProducts = activeQuery
    ? products
        .filter(p =>
          p.title?.toLowerCase().includes(activeQuery.toLowerCase()) ||
          p.category?.toLowerCase().includes(activeQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const suggestions = activeQuery
    ? products
        .filter(p => p.title?.toLowerCase().includes(activeQuery.toLowerCase()))
        .reduce((acc, p) => {
          if (!acc.find(x => x.title === p.title)) acc.push({ title: p.title, _id: p._id });
          return acc;
        }, [])
        .slice(0, 5)
    : [];

  const handleSuggestionClick = (item) => {
    navigate(`/product/${item._id}`);
    onClose();
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex items-start gap-4">

      {/* Input + Dropdown */}
      <div className="relative flex-1 z-50">

        {/* Input bar */}
        <div className="relative bg-white border border-black flex items-center min-h-14 w-full">

          {/* Typewriter placeholder — only visible when input is empty */}
          {!query && (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-gray-400 flex items-center whitespace-nowrap select-none">
              Search for&nbsp;
              <span className="text-gray-600">{word}</span>
              <span
                className="inline-block w-[1.5px] h-3.5 bg-gray-500 ml-0.5 align-middle"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
              <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
            </span>
          )}

          <input
            id="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent pr-24 pl-4 py-3 text-[15px] font-medium outline-none text-black"
            placeholder=""
          />

          {/* Right icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-gray-400 hover:text-black transition-colors"
                aria-label="Clear"
              >
                <ClearIcon />
              </button>
            )}
            <div className="w-px h-5 bg-gray-300" />
            <button className="text-gray-400 hover:text-black transition-colors" aria-label="Search">
              <SearchMagnifyIcon />
            </button>
          </div>
        </div>

        {/* Dropdown */}
        {activeQuery && (
          <div className="absolute top-full left-0 w-full bg-white border border-t-0 border-gray-200 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] z-50">
            <div className="flex flex-col sm:flex-row p-6 gap-8">

              {/* Suggestions */}
              <div className="flex-1">
                <h3 className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-4">Suggestions</h3>
                {suggestions.length > 0 ? (
                  <ul className="flex flex-col gap-4">
                    {suggestions.map((sug, i) => (
                      <li key={i}>
                        <button
                          onClick={() => handleSuggestionClick(sug)}
                          className="text-[15px] font-black text-gray-900 hover:text-black normal-case text-left w-full"
                        >
                          {sug.title.split(new RegExp(`(${activeQuery})`, 'gi')).map((part, idx) =>
                            part.toLowerCase() === activeQuery.toLowerCase()
                              ? <span key={idx} className="text-gray-400">{part}</span>
                              : <span key={idx}>{part}</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[13px] text-gray-400 font-medium">No suggestions found.</p>
                )}
              </div>

              {/* Products */}
              <div className="flex-1">
                <h3 className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-4">Products</h3>
                <div className="flex flex-col gap-5">
                  {filteredProducts.length > 0 ? filteredProducts.map(product => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      onClick={onClose}
                      className="flex gap-4 group items-center"
                    >
                      <div className="w-12 h-16 bg-gray-100 shrink-0">
                        {product.images?.[0] && (
                          <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover"/>
                        )}
                      </div>
                      <div>
                        <p className="text-[13px] font-black text-gray-900 group-hover:underline capitalize mb-1">{product.title}</p>
                        <p className="text-xs text-gray-500 font-medium">
                          Rs. {Number(product.price?.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </Link>
                  )) : (
                    <p className="text-[13px] text-gray-500 font-medium">No direct product matches found.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
              <span className="text-[13px] font-black text-gray-900">Search for "{activeQuery}"</span>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-hover:text-black transition-colors" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-black pt-3.5 transition-colors shrink-0"
        aria-label="Close search"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Search;