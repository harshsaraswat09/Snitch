import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { useNavigate } from 'react-router';
import ContinueWithGoogle from '../components/ContinueWithGoogle';

const EyeOn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const inputCls = "bg-transparent border-0 border-b border-black/20 text-sm font-light text-[#1a1a1a] py-2 outline-none placeholder:text-[#c5bdb0] focus:border-[#1a1a1a] transition-colors duration-200 rounded-none w-full";
const labelCls = "text-[9px] font-medium tracking-[0.2em] uppercase text-[#9a9080] mb-2 block";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '', contactNumber: '', email: '', password: '', isSeller: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleRegister({
        email: formData.email,
        contact: formData.contactNumber,
        password: formData.password,
        isSeller: formData.isSeller,
        fullname: formData.fullName,
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#F5F1EB] flex flex-col text-[#1a1a1a]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 sm:px-12 py-4 border-b border-black/10 shrink-0">
        <span style={{ fontFamily: "'Yeseva One', serif" }} className="text-[22px] tracking-wide text-[#1a1a1a]">SNITCH</span>
        <a
          href="/login"
          className="text-[13px] tracking-[0.16em] uppercase text-[#8a8070] hover:text-[#1a1a1a] border-b border-transparent hover:border-[#1a1a1a] pb-px transition-all duration-200"
        >
          Sign in
        </a>
      </nav>

      {/* Body — vertically centered, no scroll */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 overflow-hidden">

        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-[9px] font-medium tracking-[0.28em] uppercase text-[#9a9080] mb-2">
            New account
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] tracking-tight mb-1.5">
            Create your account
          </h1>
          <p className="text-xs font-light text-[#9a9080]">
            Join thousands of members redefining modern style.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-[460px] flex flex-col">

          {/* Name + Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mb-5">
            <div>
              <label className={labelCls}>Full Name</label>
              <input
                type="text" name="fullName" value={formData.fullName}
                onChange={handleChange} placeholder="John Doe" required
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Contact</label>
              <input
                type="tel" name="contactNumber" value={formData.contactNumber}
                onChange={handleChange} placeholder="+91 98765 43210" required
                className={inputCls}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className={labelCls}>Email Address</label>
            <input
              type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="hello@example.com" required
              className={inputCls}
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className={labelCls}>Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'} name="password"
                value={formData.password} onChange={handleChange}
                placeholder="Min. 8 characters" required
                className={`${inputCls} pr-7`}
              />
              <button
                type="button" tabIndex={-1}
                onClick={() => setShowPw(p => !p)}
                className="absolute right-0 bottom-2 text-[#b0a898] hover:text-[#1a1a1a] transition-colors duration-200"
              >
                {showPw ? <EyeOff /> : <EyeOn />}
              </button>
            </div>
          </div>

          {/* Seller toggle */}
          <div
            role="button" tabIndex={0}
            onClick={() => setFormData(p => ({ ...p, isSeller: !p.isSeller }))}
            onKeyDown={e => e.key === 'Enter' && setFormData(p => ({ ...p, isSeller: !p.isSeller }))}
            className="flex items-center justify-between py-3 border-t border-b border-black/10 mb-5 cursor-pointer select-none"
          >
            <div>
              <p className="text-[11px] font-normal tracking-wide text-[#1a1a1a] mb-0.5">
                Register as a Seller
              </p>
              <p className="text-[10px] font-light text-[#9a9080]">
                List and sell your products on Snitch
              </p>
            </div>
            <div className={`relative w-9 h-[22px] rounded-full flex-shrink-0 transition-colors duration-300 ${formData.isSeller ? 'bg-[#1a1a1a]' : 'bg-[#ddd8cf]'}`}>
              <div className={`absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${formData.isSeller ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          </div>


          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-[8px] tracking-[0.18em] uppercase text-[#c5bdb0] whitespace-nowrap">
              secure &amp; encrypted
            </span>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          {/* CTA */}
          <button
            type="submit" disabled={loading}
            className="w-full mb-4 py-3.5 bg-[#1a1a1a] text-[#F5F1EB] text-[10px] font-medium tracking-[0.26em] uppercase hover:bg-[#2e2e2e] hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-wait disabled:translate-y-0 rounded-none"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <ContinueWithGoogle/>

          {/* Sign in */}
          <p className="text-center text-[11px] font-light text-[#9a9080] mt-1">
            Already a member?{' '}
            <a href="/login" className="text-[#1a1a1a] border-b border-black/20 pb-px hover:border-[#1a1a1a] transition-colors duration-200">
              Sign in
            </a>
          </p>

        </form>
      </main>
    </div>
  );
};

export default Register;