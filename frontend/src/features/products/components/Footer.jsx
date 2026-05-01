import React from 'react';
import { Link } from 'react-router';

const InstagramIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const navLinks = [
  { label: 'Follow Us on IG', href: 'https://instagram.com', external: true },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Return & Exchange', href: '/returns' },
  { label: 'About Us', href: '/about' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Our Policy', href: '/policy' },
];

const categoryLinks = [
  { label: 'Tees', path: '/?category=tees' },
  { label: 'Pants', path: '/?category=pants' },
  { label: 'Hoodies', path: '/?category=hoodies' },
  { label: 'Jerseys', path: '/?category=jerseys' },
  { label: 'Polos', path: '/?category=polos' },
  { label: 'Tank Tops', path: '/?category=tanktops' },
];

const Footer = () => {
  return (
    <footer className="bg-[#16181f] text-white">

      {/* Top Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-10 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10">

        {/* Brand Column */}
        <div className="flex flex-col gap-5">
          <div className="flex border-2  select-none w-fit text-md font-black uppercase tracking-[-0.02em]">
            <span className="bg-white text-black px-1">ONLY</span>
            <span className="bg-transparent text-white px-1">NEEDS</span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            Premium streetwear crafted for those who move with purpose. Bold fits, clean lines, everyday essentials.
          </p>
          <a
            href="https://www.instagram.com/urbanneedsin/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors w-fit group"
          >
            <span className="p-2 border border-white/15 group-hover:border-white/50 transition-colors rounded-sm">
              <InstagramIcon />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest">Follow on Instagram</span>
          </a>
        </div>

        {/* Shop Categories */}
        <div className="flex flex-col gap-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Shop</p>
          <ul className="flex flex-col gap-3">
            {categoryLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="text-sm text-white/60 hover:text-white transition-colors capitalize tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help & Info */}
        <div className="flex flex-col gap-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Help & Info</p>
          <ul className="flex flex-col gap-3">
            {navLinks.filter(l => !l.external).map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/30 tracking-wide">
          © {new Date().getFullYear()}, URBAN NEEDS. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link to="/terms" className="text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-wide">
            Terms
          </Link>
          <span className="text-white/15">·</span>
          <Link to="/policy" className="text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-wide">
            Privacy
          </Link>
          <span className="text-white/15">·</span>
          <Link to="/returns" className="text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-wide">
            Returns
          </Link>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
