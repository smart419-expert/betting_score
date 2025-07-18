'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  UserCircleIcon, Cog6ToothIcon, BellIcon, ShieldCheckIcon, ChartBarIcon, TrophyIcon, CurrencyDollarIcon, StarIcon, PencilIcon, CameraIcon, KeyIcon, EnvelopeIcon, PhoneIcon, GlobeAltIcon, HeartIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon, XCircleIcon, ClockIcon
} from '@heroicons/react/24/outline';
import { Navbar } from '../components/navbar';
import { getUserProfile, updateUserProfile, uploadAvatar, ensureUserProfile } from '@/lib/supabaseProfile';
import { supabase } from '@/lib/supabase';

const COUNTRY_LIST = [
  'South Africa', 'Nigeria', 'Kenya', 'Ghana', 'Egypt', 'Morocco', 'Other'
];

function TierBadge({ tier }: { tier: string }) {
  return (
    <span className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full font-semibold shadow-lg border border-white/20">
      {tier}
    </span>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'history' | 'security'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', bio: '', residence: '' });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError(userError ? userError.message : 'User not found');
        setLoading(false);
        return;
      }
      await ensureUserProfile();
      const userId = user.id;
      getUserProfile(userId).then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }
        if (!data || data.length === 0) {
          setError('User not found.');
          setLoading(false);
          return;
        }
        if (data.length > 1) {
          setError('Multiple users found with this ID.');
          setLoading(false);
          return;
        }
        setUser(data[0]);
        setLoading(false);
        setEditForm({
          name: data[0].name || '',
          email: data[0].email || '',
          phone: data[0].phone || '',
          bio: data[0].bio || '',
          residence: data[0].country || '',
        });
      });
    }
    fetchProfile();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      setAvatarPreview(URL.createObjectURL(file));
      setLoading(true);
      const { url, error } = await uploadAvatar(user.id, file);
      setLoading(false);
      if (url) setUser((u: any) => ({ ...u, avatars: url }));
      if (error) setError(error.message);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    const { error } = await updateUserProfile(user.id, {
      name: editForm.name,
      phone: editForm.phone,
      country: editForm.residence,
      bio: editForm.bio,
    });
    setLoading(false);
    if (error) setError(error.message);
    else {
      // Update local state with the correct field mapping
      setUser((u: any) => ({ 
        ...u, 
        name: editForm.name,
        phone: editForm.phone,
        country: editForm.residence, // Map residence to country
        bio: editForm.bio
      }));
      setIsEditing(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-400">{error}</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-900">
      <Navbar name="My Profile" />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-300">Manage your account, view statistics, and customize your experience</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-900/50 rounded-xl p-1 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'overview' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <UserCircleIcon className="w-5 h-5" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'settings' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Cog6ToothIcon className="w-5 h-5" />
              Settings
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'history' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ChartBarIcon className="w-5 h-5" />
              History
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'security' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ShieldCheckIcon className="w-5 h-5" />
              Security
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-[#181A20] rounded-2xl border border-blue-800 p-6">
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto overflow-hidden">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                        ) : user.avatars ? (
                          <img src={user.avatars} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                        ) : (
                          <UserCircleIcon className="w-20 h-20 text-gray-400" />
                        )}
                      </div>
                      <button
                        className="absolute bottom-4 right-0 bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <CameraIcon className="w-4 h-4 text-white" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-600 text-white`}>
                      {user.tier} Tier
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-300">
                      <EnvelopeIcon className="w-5 h-5" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <PhoneIcon className="w-5 h-5" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <GlobeAltIcon className="w-5 h-5" />
                      <span>{user.country}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CalendarIcon className="w-5 h-5" />
                      <span>Member since {user.createdAt ? new Date(user.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' }) : ''}</span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-white mb-2">Bio</h3>
                    <p className="text-gray-300 text-sm">{user.bio}</p>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <PencilIcon className="w-5 h-5" />
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Stats and Performance */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#181A20] rounded-xl border border-blue-800 p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{user.stats?.totalTips || 0}</div>
                    <div className="text-sm text-gray-400">Total Tips</div>
                  </div>
                  <div className="bg-[#181A20] rounded-xl border border-blue-800 p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{user.stats?.winRate || 0}%</div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                  </div>
                  <div className="bg-[#181A20] rounded-xl border border-blue-800 p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">${user.stats?.totalEarnings || 0}</div>
                    <div className="text-sm text-gray-400">Total Earnings</div>
                  </div>
                  <div className="bg-[#181A20] rounded-xl border border-blue-800 p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{user.stats?.streak || 0}</div>
                    <div className="text-sm text-gray-400">Day Streak</div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="bg-[#181A20] rounded-2xl border border-blue-800 p-6">
                  <h3 className="text-xl font-bold text-blue-200 mb-4">Monthly Performance</h3>
                  <div className="space-y-3">
                    {/* Mock performance data for now */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 text-sm text-gray-400">Jan</div>
                      <div className="flex-1 bg-gray-800 rounded-full h-4">
                        <div 
                          className="bg-green-500 h-4 rounded-full transition-all" 
                          style={{ width: `${(12 / (12 + 3)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-white font-semibold">
                        12W-3L
                      </div>
                      <div className="text-sm text-green-400 font-semibold">
                        $450
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 text-sm text-gray-400">Feb</div>
                      <div className="flex-1 bg-gray-800 rounded-full h-4">
                        <div 
                          className="bg-green-500 h-4 rounded-full transition-all" 
                          style={{ width: `${(15 / (15 + 5)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-white font-semibold">
                        15W-5L
                      </div>
                      <div className="text-sm text-green-400 font-semibold">
                        $680
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 text-sm text-gray-400">Mar</div>
                      <div className="flex-1 bg-gray-800 rounded-full h-4">
                        <div 
                          className="bg-green-500 h-4 rounded-full transition-all" 
                          style={{ width: `${(18 / (18 + 4)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-white font-semibold">
                        18W-4L
                      </div>
                      <div className="text-sm text-green-400 font-semibold">
                        $920
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 text-sm text-gray-400">Apr</div>
                      <div className="flex-1 bg-gray-800 rounded-full h-4">
                        <div 
                          className="bg-green-500 h-4 rounded-full transition-all" 
                          style={{ width: `${(14 / (14 + 6)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-white font-semibold">
                        14W-6L
                      </div>
                      <div className="text-sm text-green-400 font-semibold">
                        $580
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 text-sm text-gray-400">May</div>
                        <div className="flex-1 bg-gray-800 rounded-full h-4">
                          <div 
                            className="bg-green-500 h-4 rounded-full transition-all" 
                          style={{ width: `${(20 / (20 + 2)) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-white font-semibold">
                        20W-2L
                        </div>
                        <div className="text-sm text-green-400 font-semibold">
                        $1200
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 text-sm text-gray-400">Jun</div>
                      <div className="flex-1 bg-gray-800 rounded-full h-4">
                        <div 
                          className="bg-green-500 h-4 rounded-full transition-all" 
                          style={{ width: `${(16 / (16 + 4)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-white font-semibold">
                        16W-4L
                        </div>
                      <div className="text-sm text-green-400 font-semibold">
                        $890
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-[#181A20] rounded-2xl border border-blue-800 p-6">
                  <h3 className="text-xl font-bold text-blue-200 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {/* Mock betting history for now */}
                    <div key={1} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-green-400">
                          <CheckCircleIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Man United vs Liverpool - Over 2.5 Goals</div>
                          <div className="text-sm text-gray-400">2024-07-15</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">$50</div>
                        <div className="text-sm font-semibold text-green-400">
                          $97.50
                        </div>
                      </div>
                    </div>
                    <div key={2} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-green-400">
                          <CheckCircleIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Real Madrid vs Barcelona - BTTS</div>
                          <div className="text-sm text-gray-400">2024-07-14</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">$30</div>
                        <div className="text-sm font-semibold text-green-400">
                          $51.00
                        </div>
                      </div>
                    </div>
                    <div key={3} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                        <div className="text-red-400">
                          <XCircleIcon className="w-4 h-4" />
                          </div>
                          <div>
                          <div className="text-white font-semibold">Arsenal vs Chelsea - Arsenal Win</div>
                          <div className="text-sm text-gray-400">2024-07-13</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">$25</div>
                        <div className="text-sm font-semibold text-red-400">
                          $0
                        </div>
                      </div>
                    </div>
                    <div key={4} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-green-400">
                          <CheckCircleIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">EUR/USD - Buy Signal</div>
                          <div className="text-sm text-gray-400">2024-07-12</div>
                          </div>
                        </div>
                        <div className="text-right">
                        <div className="text-white font-semibold">$100</div>
                        <div className="text-sm font-semibold text-green-400">
                          $185.00
                        </div>
                      </div>
                    </div>
                    <div key={5} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-green-400">
                          <CheckCircleIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Tennis - Djokovic Win</div>
                          <div className="text-sm text-gray-400">2024-07-11</div>
                        </div>
                          </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">$40</div>
                        <div className="text-sm font-semibold text-green-400">
                          $64.00
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Notification Settings */}
              <div className="bg-[#181A20] rounded-2xl border border-blue-800 p-6">
                <h3 className="text-xl font-bold text-blue-200 mb-4 flex items-center gap-2">
                  <BellIcon className="w-6 h-6" />
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {Object.entries(user.preferences?.notifications || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <button className={`w-12 h-6 rounded-full transition-colors ${
                        value ? 'bg-blue-600' : 'bg-gray-600'
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-[#181A20] rounded-2xl border border-blue-800 p-6">
                <h3 className="text-xl font-bold text-blue-200 mb-4 flex items-center gap-2">
                  <EyeIcon className="w-6 h-6" />
                  Privacy Settings
                </h3>
                <div className="space-y-4">
                  {Object.entries(user.preferences?.privacy || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <button className={`w-12 h-6 rounded-full transition-colors ${
                        value ? 'bg-blue-600' : 'bg-gray-600'
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-[#181A20] rounded-2xl border border-blue-800 p-6">
              <h3 className="text-xl font-bold text-blue-200 mb-6">Betting History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900/70">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Tip</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Stake</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Odds</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Result</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Payout</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {/* Mock betting history for now */}
                    <tr className="hover:bg-gray-800/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2024-07-15</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">Man United vs Liverpool - Over 2.5 Goals</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${50}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300 font-bold">{1.95}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-600 text-white">
                          <CheckCircleIcon className="w-4 h-4" />
                          Win
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-400">
                        ${97.50}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-800/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2024-07-14</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">Real Madrid vs Barcelona - BTTS</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${30}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300 font-bold">{1.70}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-600 text-white">
                          <CheckCircleIcon className="w-4 h-4" />
                          Win
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-400">
                        ${51.00}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-800/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2024-07-13</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">Arsenal vs Chelsea - Arsenal Win</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${25}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300 font-bold">{2.10}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white">
                          <XCircleIcon className="w-4 h-4" />
                          Loss
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-400">
                        ${0}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-800/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2024-07-12</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">EUR/USD - Buy Signal</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${100}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300 font-bold">{1.85}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-600 text-white">
                          <CheckCircleIcon className="w-4 h-4" />
                          Win
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-400">
                        ${185.00}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-800/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2024-07-11</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">Tennis - Djokovic Win</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${40}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300 font-bold">{1.60}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-600 text-white">
                          <CheckCircleIcon className="w-4 h-4" />
                          Win
                          </span>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-400">
                        ${64.00}
                        </td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Change Password */}
              <div className="bg-[#181A20] rounded-2xl border border-blue-800 p-6">
                <h3 className="text-xl font-bold text-blue-200 mb-4 flex items-center gap-2">
                  <KeyIcon className="w-6 h-6" />
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400"
                        placeholder="Enter current password"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition-colors">
                    Update Password
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-[#181A20] rounded-2xl border border-blue-800 p-6">
                <h3 className="text-xl font-bold text-blue-200 mb-4 flex items-center gap-2">
                  <ShieldCheckIcon className="w-6 h-6" />
                  Two-Factor Authentication
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <div className="text-white font-semibold">SMS Authentication</div>
                      <div className="text-sm text-gray-400">Receive codes via SMS</div>
                    </div>
                    <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                      Enable
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <div className="text-white font-semibold">App Authentication</div>
                      <div className="text-sm text-gray-400">Use authenticator app</div>
                    </div>
                    <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#181A20] rounded-2xl border border-blue-800 p-8 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
            <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSaveProfile(); }}>
              <input
                value={editForm.name}
                onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none text-lg"
                placeholder="Name"
              />
              <input
                value={editForm.phone}
                onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none text-lg"
                placeholder="Phone"
              />
              <select
                value={editForm.residence}
                onChange={e => setEditForm(f => ({ ...f, residence: e.target.value }))}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none text-lg"
              >
                <option value="">Select Country</option>
                {COUNTRY_LIST.map(c => <option key={c}>{c}</option>)}
              </select>
              <textarea
                value={editForm.bio}
                onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none text-lg"
                placeholder="Bio"
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                <button type="submit" disabled={loading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition font-bold text-lg active:scale-95">{loading ? 'Saving...' : 'Save'}</button>
                <button type="button" onClick={() => setIsEditing(false)} className="px-5 py-2 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition font-bold text-lg">Cancel</button>
              </div>
              {error && <div className="text-red-400 font-semibold mt-2">{error}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarIcon(props: any) {
  return <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 7.5h16.5M4.5 21h15a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75h-15a.75.75 0 00-.75.75v13.5c0 .414.336.75.75.75z" /></svg>;
} 