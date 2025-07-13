'use client'

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Add authentication logic here
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center min-h-[93vh] justify-center bg-black">
      <div className="w-full max-w-md mx-auto rounded-3xl shadow-2xl bg-[#181A20] px-8 py-10 flex flex-col items-center">
        {/* Logo/Icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mb-6 shadow-lg">
          {/* Replace with your logo/icon as needed */}
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" fill="url(#grad)" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v5m0 0v2m0-2h2m-2 0H10" /><defs><linearGradient id="grad" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#34d399" /><stop offset="1" stopColor="#3b82f6" /></linearGradient></defs></svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1 text-center">Welcome to TipVerse</h1>
        <p className="text-gray-300 mb-6 text-center">Sign in to continue</p>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-700 rounded-lg py-3 text-white font-medium text-base hover:bg-gray-800 transition mb-4"
        >
          <FcGoogle className="w-5 h-5" /> Continue with Google
        </button>

        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <label className="block text-sm text-gray-400 mb-1" htmlFor="email">Email</label>
          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full bg-transparent border border-gray-700 rounded-lg py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <label className="block text-sm text-gray-400 mb-1" htmlFor="password">Password</label>
          <div className="relative mb-6">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full bg-transparent border border-gray-700 rounded-lg py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0a1120] hover:bg-[#101a33] text-white font-semibold rounded-lg py-3 transition mb-2"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex justify-between w-full mt-2 text-sm">
          <Link href="/forgot-password" className="text-gray-400 hover:text-blue-400">Forgot password?</Link>
          <span className="text-gray-400">Need an account? <Link href="/register" className="text-white font-semibold hover:text-blue-400">Sign up</Link></span>
        </div>
      </div>
    </div>
  );
} 