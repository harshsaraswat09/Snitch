
const ContinueWithGoogle = () => {
    return (
        <a href="/api/auth/google"
            className="flex items-center justify-center gap-3 w-full py-3 mb-5 border bg-white border-black/15 hover:border-black/40 hover:bg-black/[0.02] transition-all duration-200 cursor-pointer"
        >
            <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.09-6.09C34.46 3.19 29.5 1 24 1 14.82 1 7.07 6.49 3.64 14.24l7.08 5.5C12.4 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.7c-.55 2.96-2.2 5.47-4.68 7.16l7.18 5.57C43.36 37.26 46.52 31.3 46.52 24.5z" />
                <path fill="#FBBC05" d="M10.72 28.26A14.7 14.7 0 0 1 9.5 24c0-1.48.25-2.91.7-4.26l-7.08-5.5A23.93 23.93 0 0 0 0 24c0 3.87.92 7.53 2.56 10.76l8.16-6.5z" />
                <path fill="#34A853" d="M24 47c6.48 0 11.93-2.14 15.9-5.82l-7.18-5.57C30.6 37.45 27.45 38.5 24 38.5c-6.26 0-11.6-4.22-13.28-9.94l-8.16 6.5C6.07 42.51 14.44 47 24 47z" />
            </svg>
            <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#1a1a1a]">
                Continue with Google
            </span>
        </a>
    )
}

export default ContinueWithGoogle