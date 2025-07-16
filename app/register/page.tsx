'use client'

import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirm) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });

    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }

    setEmailSent(true);
    toast.success('Account created! Please check your email to verify your account.');
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Registration successful!');
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center min-h-[93vh] justify-center bg-black">
      <div className="w-full max-w-md mx-auto rounded-3xl shadow-2xl bg-[#181A20] px-8 py-10 flex flex-col items-center">
        {/* Logo/Icon */}
        <Image src="/apple-touch-icon.png" alt="Gambino" width={100} height={100} />
        <h1 className="text-2xl font-bold text-white mb-1 text-center">Welcome to Gambino</h1>
        <p className="text-gray-600 mb-6 text-center">Create an account to get started</p>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 mb-4 bg-white text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
        >
          <FcGoogle className="w-5 h-5" />
          {loading ? 'Redirecting...' : 'Sign up with Google'}
        </button>
        {emailSent ? (
          <div className="w-full max-w-sm text-center text-green-400 mt-6">
            <p className="mb-2">Account created! Please check your email to verify your account before logging in.</p>
            <Link href="/login" className="text-blue-500 hover:text-blue-600">Go to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-[#282C34] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
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
            <div className="mb-4">
              <label htmlFor="confirm" className="block text-sm font-medium text-white mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-3 py-2 bg-[#282C34] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-lg hover:from-green-500 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
            <div className="mt-4 text-center text-white">
              Already have an account? <Link href="/login" className="text-blue-500 hover:text-blue-600">Log in</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}