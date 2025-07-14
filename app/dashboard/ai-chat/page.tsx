'use client';

import React from 'react';
import Navbar from '../components/navbar';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function AIChatPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#101522] via-[#181d2a] to-[#1a2236] text-white overflow-hidden">
      {/* Floating Gradient Orbs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-blue-600/30 to-purple-500/20 rounded-full blur-2xl opacity-60 animate-float-slow z-0" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-tr from-purple-600/30 to-blue-400/20 rounded-full blur-2xl opacity-50 animate-float-slower z-0" />
      <div className="absolute top-1/2 right-10 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/10 rounded-full blur-2xl opacity-40 animate-float z-0" />

      <Navbar location="Gambino AI" />

      {/* Chat area */}
      <div className="relative z-10 flex-[1_1_0%] flex flex-col px-4 md:px-8 py-8 overflow-y-auto">
        {/* Example message */}
        <div className="max-w-xl">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-5 shadow-2xl border border-white/20 ring-1 ring-blue-400/10 ring-inset mb-4 animate-fade-in">
            <span className="block text-base text-white/90">Hello! I'm your <span className="font-bold text-blue-300">Gambino Assistant</span>. Ask me about <span className="text-purple-300">match stats</span>, <span className="text-blue-200">player form</span>, or <span className="text-purple-200">H2H records</span> to help you build better tickets.</span>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <form className="relative z-10 w-full px-4 md:px-8 pb-8">
        <div className="flex items-center bg-white/10 backdrop-blur-xl border border-blue-400/30 rounded-2xl shadow-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-400/40 transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-white placeholder-white/50 text-base md:text-lg font-medium"
            placeholder="Ask about H2H, stats, or form..."
            disabled
            aria-label="Chat input (coming soon)"
          />
          <button
            type="submit"
            className="ml-3 p-2 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition disabled:opacity-60"
            disabled
            aria-label="Send message (disabled)"
          >
            <svg className="w-5 h-5 text-white drop-shadow-glow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes float-slower { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(20px); } }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 12s ease-in-out infinite; }
        .drop-shadow-glow { filter: drop-shadow(0 0 8px #7f9cf5aa); }
        .animate-fade-in { animation: fadeIn 1s cubic-bezier(.4,0,.2,1) both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none;} }
      `}</style>
    </div>
  );
} 