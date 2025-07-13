'use client'

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Add registration logic here
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-[93vh] flex items-center justify-center bg-black">
      <div className="w-full max-w-md mx-auto rounded-3xl shadow-2xl bg-[#181A20] px-8 py-10 flex flex-col items-center">
        {/* Logo/Icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mb-6 shadow-lg">
          {/* Replace with your logo/icon as needed */}
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" fill="url(#grad)" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v5m0 0v2m0-2h2m-2 0H10" /><defs><linearGradient id="grad" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#34d399" /><stop offset="1" stopColor="#3b82f6" /></linearGradient></defs></svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1 text-center">Create your account</h1>
        <p className="text-gray-300 mb-6 text-center">Sign up to get started</p>

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
          <label className="block text-sm text-gray-400 mb-1" htmlFor="name">Full Name</label>
          <div className="relative mb-4">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full bg-transparent border border-gray-700 rounded-lg py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

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
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full bg-transparent border border-gray-700 rounded-lg py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <label className="block text-sm text-gray-400 mb-1" htmlFor="confirm">Confirm Password</label>
          <div className="relative mb-6">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              className="w-full bg-transparent border border-gray-700 rounded-lg py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm Password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0a1120] hover:bg-[#101a33] text-white font-semibold rounded-lg py-3 transition mb-2"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="flex justify-between w-full mt-2 text-sm">
          <span className="text-gray-400">Already have an account? <Link href="/login" className="text-white font-semibold hover:text-blue-400">Sign in</Link></span>
        </div>
      </div>
    </div>
  );
} 