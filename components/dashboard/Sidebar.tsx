'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  HomeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  UserIcon,
  CreditCardIcon,
  CogIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  LifebuoyIcon,
  TrophyIcon,
  WalletIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

const navLinks = [
  { name: 'Feed', href: '/dashboard/feed', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Sports Preview', href: '/dashboard/tips', icon: TrophyIcon },
  { name: 'Forex Preview', href: '/dashboard/forex', icon: CurrencyDollarIcon },
  { name: 'AI Chat', href: '/dashboard/ai-chat', icon: ChatBubbleLeftRightIcon },
  { name: 'Ticket Builder', href: '/dashboard/betslips', icon: CogIcon, premium: true },
  { name: 'Collaboration', href: '/dashboard/community', icon: UsersIcon, premium: true },
  { name: 'Wallet', href: '/dashboard/wallet', icon: WalletIcon },
];

const bottomLinks = [
  { name: 'My Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Log out', href: '/', icon: ArrowRightOnRectangleIcon },
];

const roles = [
  { label: 'Free User', value: 'free' },
  { label: 'Premium', value: 'premium' },
  { label: 'Admin', value: 'admin' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState('free');
  const router = useRouter();
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-gradient-to-b from-[#232b3a]/90 to-[#181A20]/95 backdrop-blur-xl border-r border-white/10 shadow-2xl">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center h-16 px-6 border-b border-white/10 bg-white/5">
            <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mr-3 shadow-lg">B</span>
            <span className="text-2xl font-extrabold text-white tracking-tight drop-shadow">Gambino AI</span>
          </div>
        </Link>

        {/* Test Role Dropdown */}
        <div className="px-6 py-4">
          <label className="block text-xs text-white/60 mb-1">Test Role:</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full bg-white/10 text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:border-blue-400 focus:ring-0 shadow-inner"
          >
            {roles.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>

        {/* User Info */}
        <div className="flex items-center px-6 py-3 mb-2 bg-white/5 rounded-xl mx-4 shadow-md">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold text-xl mr-3 shadow-lg">TU</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-base truncate">Test User</span>
              <span className="bg-blue-700/80 text-xs text-white px-2 py-0.5 rounded-full font-semibold">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
              <button className="ml-2 text-xs bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-0.5 rounded font-bold hover:from-yellow-300 hover:to-yellow-400 transition shadow">Upgrade</button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 mt-2">
          <ul className="space-y-1">
            {navLinks.map(link => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={clsx(
                    pathname === link.href
                      ? 'bg-gradient-to-r from-blue-700/60 to-purple-700/60 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10',
                    'flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-all duration-150',
                    link.premium && 'relative'
                  )}
                >
                  <link.icon className="w-6 h-6" />
                  <span>{link.name}</span>
                  {link.premium && (
                    <StarIcon className="w-4 h-4 text-yellow-400 ml-auto" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Links */}
        <div className="mt-auto px-2 pb-4">
          <ul className="space-y-1">
            {bottomLinks.map(link => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={clsx(
                    pathname === link.href
                      ? 'bg-gradient-to-r from-blue-700/60 to-purple-700/60 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10',
                    'flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-all duration-150'
                  )}
                  onClick={() => {
                    if (link.name === 'Log out') {
                      supabase.auth.signOut();
                      localStorage.removeItem('access_token');
                      localStorage.removeItem('refresh_token');
                      toast.success('Logged out successfully');
                      setTimeout(() => {
                        router.push('/');
                      }, 2000);
                    }
                  }}
                >
                  <link.icon className="w-6 h-6" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Wallet Card */}
        <div className="mx-4 mb-6 mt-2">
          <div className="rounded-xl bg-gradient-to-br from-blue-900/80 to-purple-900/80 border border-blue-400/30 p-4 flex items-center gap-3 shadow-xl backdrop-blur-md">
            <WalletIcon className="w-6 h-6 text-blue-400" />
            <span className="text-white font-semibold">Wallet: <span className="text-blue-300">R0</span></span>
          </div>
        </div>
      </div>
    </aside>
  );
} 