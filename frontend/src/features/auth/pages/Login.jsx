import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";
import ContinueWithGoogle from '../components/ContinueWithGoogle';


const EyeOn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleLogin({ email: formData.email, password: formData.password });
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#F5F1EB] flex flex-col text-[#1a1a1a]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 sm:px-12 py-5 border-b border-black/10">
        <span style={{ fontFamily: "'Yeseva One', serif" }} className="text-[22px] tracking-wide text-[#1a1a1a]">SNITCH</span>
        <a
          href="/register"
          className="text-[13px] tracking-[0.16em] uppercase text-[#8a8070] hover:text-[#1a1a1a] border-b border-transparent hover:border-[#1a1a1a] pb-px transition-all duration-200"
        >
          Create account
        </a>
      </nav>

      {/* Body */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 overflow-hidden">

        {/* Heading */}
        <p className="text-[9px] font-medium tracking-[0.28em] uppercase text-[#9a9080] mb-3">
          Welcome back
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1a1a1a] text-center mb-2 tracking-tight">
          Sign in to your account
        </h1>
        <p className="text-sm font-light text-[#9a9080] mb-14">
          Good to see you again.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-[460px] flex flex-col">

          {/* Email */}
          <div className="flex flex-col mb-8">
            <label className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#9a9080] mb-2.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hello@example.com"
              required
              className="bg-transparent border-0 border-b border-black/20 text-sm font-light text-[#1a1a1a] py-2.5 outline-none placeholder:text-[#c5bdb0] focus:border-[#1a1a1a] transition-colors duration-200 rounded-none w-full"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col mb-8">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#9a9080]">
                Password
              </label>

            </div>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="bg-transparent border-0 border-b border-black/20 text-sm font-light text-[#1a1a1a] py-2.5 pr-7 outline-none placeholder:text-[#c5bdb0] focus:border-[#1a1a1a] transition-colors duration-200 rounded-none w-full"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPw(p => !p)}
                className="absolute right-0 bottom-2.5 text-[#b0a898] hover:text-[#1a1a1a] transition-colors duration-200"
              >
                {showPw ? <EyeOff /> : <EyeOn />}
              </button>
            </div>
          </div>


          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-[8px] font-normal tracking-[0.18em] uppercase text-[#c5bdb0] whitespace-nowrap">
              secure &amp; encrypted
            </span>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mb-4 py-4 bg-[#1a1a1a] text-[#F5F1EB] text-[10px] font-medium tracking-[0.26em] uppercase hover:bg-[#2e2e2e] hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-wait disabled:translate-y-0 rounded-none"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <ContinueWithGoogle/>


          {/* Register link */}
          <p className="text-center text-[11px] font-light text-[#9a9080] tracking-wide mt-1">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-[#1a1a1a] border-b border-black/20 pb-px hover:border-[#1a1a1a] transition-colors duration-200"
            >
              Create one
            </a>
          </p>

        </form>

        {/* Legal */}
        <p className="mt-12 text-[10px] font-light text-[#b0a898] text-center leading-loose max-w-xs">
          By signing in you agree to our{' '}
          <a href="/terms" className="text-[#6a6458] border-b border-[#6a6458]/30 pb-px">Terms of Service</a>
          {' '}and{' '}
          <a href="/privacy" className="text-[#6a6458] border-b border-[#6a6458]/30 pb-px">Privacy Policy</a>.
        </p>

      </main>
    </div>
  );
};

export default Login;