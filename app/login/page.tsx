'use client'

import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from '@/lib/supabase';
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    toast.success('Login successful!');
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex items-center min-h-[93vh] justify-center bg-black">
      <div className="w-full max-w-md mx-auto rounded-3xl shadow-2xl bg-[#181A20] px-8 py-10 flex flex-col items-center">
        {/* Logo/Icon */}
        <Image src="/apple-touch-icon.png" alt="Gambino" width={100} height={100} />
        <h1 className="text-2xl font-bold text-white mb-1 text-center">Welcome to Gambino</h1>
        <p className="text-gray-600 mb-6 text-center">Log in to your account</p>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 mb-4 bg-white text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
        >
          <FcGoogle className="w-5 h-5" />
          {loading ? 'Redirecting...' : 'Sign in with Google'}
        </button>
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