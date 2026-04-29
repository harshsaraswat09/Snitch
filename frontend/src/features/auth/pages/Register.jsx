import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ fullname: fullName, contact: contactNumber, email, password, isSeller });
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 font-sans">
      {/* Card */}
      <div className="flex w-full max-w-5xl rounded-3xl shadow-2xl bg-white overflow-hidden">

        {/* Left — Form */}
        <div className="flex flex-1 flex-col px-8 py-8 sm:px-12 justify-center">
          {/* Header */}
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight text-black">Create account</h2>
            <p className="text-sm text-gray-500">Fill in your details to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="text-xs font-medium tracking-wide text-gray-600 uppercase">Full Name</label>
              <input
                id="fullName" type="text" value={fullName}
                onChange={(e) => setFullName(e.target.value)} required
                placeholder="John Doe"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black placeholder-gray-300 outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10"
              />
            </div>

            {/* Two-column row: Contact + Email */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="contactNumber" className="text-xs font-medium tracking-wide text-gray-600 uppercase">Contact</label>
                <input
                  id="contactNumber" type="tel" value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)} required
                  placeholder="+1 555 0000"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black placeholder-gray-300 outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium tracking-wide text-gray-600 uppercase">Email</label>
                <input
                  id="email" type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} required
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black placeholder-gray-300 outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10"
                />
              </div>
            </div>

            {/* Password with Eye Icon */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-medium tracking-wide text-gray-600 uppercase">Password</label>
              <div className="relative">
                <input
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-black placeholder-gray-300 outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Seller toggle */}
            <label htmlFor="isSeller" className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition hover:bg-gray-100">
              <input
                id="isSeller" type="checkbox"
                checked={isSeller} onChange={(e) => setIsSeller(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-black"
              />
              <span className="text-sm text-gray-600">Register as a Seller</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-semibold tracking-widest text-white transition hover:bg-gray-900 hover:shadow-lg"
            >
              <span className="uppercase">Create Account</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-gray-200" />
              <span className="text-xs text-gray-400 uppercase tracking-widest">or</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            {/* Google */}
            <a
              href="https://urbanneeds-1tgi.onrender.com/api/auth/google"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-sm font-medium text-black transition hover:bg-white hover:border-gray-300 hover:shadow-sm"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </a>

            {/* Login link */}
            <p className="text-center text-xs text-gray-500">
              Already have an account?{' '}
              <span onClick={() => navigate('/login')} className="cursor-pointer font-semibold text-black hover:underline">
                Sign in
              </span>
            </p>

          </form>
        </div>

        {/* Right — Image */}
        <div className="relative hidden lg:flex lg:w-2/5 flex-col justify-between p-8 overflow-hidden bg-gray-900">
          {/* Full image, no overlay */}
          <img
            src="/registerPage.webp"
            alt="Fashion"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Top gradient for brand readability */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
          {/* Bottom gradient for headline readability */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Top — Brand */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-white" />
            <span className="text-xs font-semibold tracking-[0.25em] text-white/80 uppercase">URBAN NEEDS</span>
          </div>

          {/* Bottom — Headline */}
          <div className="relative z-10 space-y-3">
            <h1 className="text-4xl font-light leading-tight text-white">
              Curated<br />
              <span className="font-bold">Fashion.</span>
            </h1>
            <p className="text-sm text-white/70 leading-relaxed">
              Discover seamless, minimal, and premium quality clothing.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;