// app/login/page.tsx
'use client'

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from '@/src/supabaseClient';
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Login successful!');
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000)
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
        <p className="text-gray-600 mb-6 text-center">Log in to your account</p>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#282C34] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#282C34] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-lg hover:from-green-500 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
          <div className="mt-4 text-center text-white">
            Don't have an account? <Link href="/register" className="text-blue-500 hover:text-blue-600">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}