'use client';

import React, { useState } from 'react';
import { 
  UserCircleIcon, 
  Cog6ToothIcon, 
  BellIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  StarIcon,
  PencilIcon,
  CameraIcon,
  KeyIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  HeartIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Navbar } from '../components/navbar';

// Mock user data
const userProfile = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+27 123 456 789',
  avatar: '👨‍💼',
  tier: 'Pro',
  tierColor: 'bg-green-600',
  joinDate: 'March 2024',
  location: 'Cape Town, South Africa',
  bio: 'Passionate sports betting enthusiast with a focus on football and forex trading.',
  stats: {
    totalTips: 156,
    winRate: 78,
    totalEarnings: 2840,
    followers: 234,
    following: 89,
    streak: 12
  },
  preferences: {
    notifications: {
      email: true,
      push: true,
      sms: false,
      tips: true,
      collab: true,
      news: false
    },
    privacy: {
      profilePublic: true,
      showStats: true,
      allowMessages: true,
      showOnlineStatus: true
    }
  }
};

// Mock betting history
const bettingHistory = [
  { id: 1, date: '2024-07-15', tip: 'Man United vs Liverpool - Over 2.5 Goals', stake: 50, odds: 1.95, result: 'win', payout: 97.50 },
  { id: 2, date: '2024-07-14', tip: 'Real Madrid vs Barcelona - BTTS', stake: 30, odds: 1.70, result: 'win', payout: 51.00 },
  { id: 3, date: '2024-07-13', tip: 'Arsenal vs Chelsea - Arsenal Win', stake: 25, odds: 2.10, result: 'loss', payout: 0 },
  { id: 4, date: '2024-07-12', tip: 'EUR/USD - Buy Signal', stake: 100, odds: 1.85, result: 'win', payout: 185.00 },
  { id: 5, date: '2024-07-11', tip: 'Tennis - Djokovic Win', stake: 40, odds: 1.60, result: 'win', payout: 64.00 },
];

// Mock performance data for charts
const performanceData = [
  { month: 'Jan', wins: 12, losses: 3, earnings: 450 },
  { month: 'Feb', wins: 15, losses: 5, earnings: 680 },
  { month: 'Mar', wins: 18, losses: 4, earnings: 920 },
  { month: 'Apr', wins: 14, losses: 6, earnings: 580 },
  { month: 'May', wins: 20, losses: 2, earnings: 1200 },
  { month: 'Jun', wins: 16, losses: 4, earnings: 890 },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'history' | 'security'>('overview');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    bio: userProfile.bio,
    location: userProfile.location
  });

  const handleSaveProfile = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const getResultColor = (result: string) => {
    return result === 'win' ? 'text-green-400' : result === 'loss' ? 'text-red-400' : 'text-yellow-400';
  };

  const getResultIcon = (result: string) => {
    return result === 'win' ? <CheckCircleIcon className="w-4 h-4" /> : 
           result === 'loss' ? <XCircleIcon className="w-4 h-4" /> : 
           <ClockIcon className="w-4 h-4" />;
  };

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
                      <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                        {userProfile.avatar}
                      </div>
                      <button className="absolute bottom-4 right-0 bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition-colors">
                        <CameraIcon className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{userProfile.name}</h2>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${userProfile.tierColor} text-white`}>
                      {userProfile.tier} Tier
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-300">
                      <EnvelopeIcon className="w-5 h-5" />
                      <span>{userProfile.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <PhoneIcon className="w-5 h-5" />
                      <span>{userProfile.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <GlobeAltIcon className="w-5 h-5" />
                      <span>{userProfile.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CalendarIcon className="w-5 h-5" />
                      <span>Member since {userProfile.joinDate}</span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-white mb-2">Bio</h3>
                    <p className="text-gray-300 text-sm">{userProfile.bio}</p>
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
                    <div className="text-2xl font-bold text-white mb-1">{userProfile.stats.totalTips}</div>
                    <div className="text-sm text-gray-400">Total Tips</div>
                  </div>
                  <div className="bg-[#181A20] rounded-xl border border-blue-800 p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{userProfile.stats.winRate}%</div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                  </div>
                  <div className="bg-[#181A20] rounded-xl border border-blue-800 p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">${userProfile.stats.totalEarnings}</div>
                    <div className="text-sm text-gray-400">Total Earnings</div>
                  </div>
                  <div className="bg-[#181A20] rounded-xl border border-blue-800 p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{userProfile.stats.streak}</div>
                    <div className="text-sm text-gray-400">Day Streak</div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="bg-[#181A20] rounded-2xl border border-blue-800 p-6">
                  <h3 className="text-xl font-bold text-blue-200 mb-4">Monthly Performance</h3>
                  <div className="space-y-3">
                    {performanceData.map((data, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-12 text-sm text-gray-400">{data.month}</div>
                        <div className="flex-1 bg-gray-800 rounded-full h-4">
                          <div 
                            className="bg-green-500 h-4 rounded-full transition-all" 
                            style={{ width: `${(data.wins / (data.wins + data.losses)) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-white font-semibold">
                          {data.wins}W-{data.losses}L
                        </div>
                        <div className="text-sm text-green-400 font-semibold">
                          ${data.earnings}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-[#181A20] rounded-2xl border border-blue-800 p-6">
                  <h3 className="text-xl font-bold text-blue-200 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {bettingHistory.slice(0, 3).map((bet) => (
                      <div key={bet.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`${getResultColor(bet.result)}`}>
                            {getResultIcon(bet.result)}
                          </div>
                          <div>
                            <div className="text-white font-semibold">{bet.tip}</div>
                            <div className="text-sm text-gray-400">{bet.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">${bet.stake}</div>
                          <div className={`text-sm font-semibold ${getResultColor(bet.result)}`}>
                            ${bet.payout}
                          </div>
                        </div>
                      </div>
                    ))}
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
                  {Object.entries(userProfile.preferences.notifications).map(([key, value]) => (
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
                  {Object.entries(userProfile.preferences.privacy).map(([key, value]) => (
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
                    {bettingHistory.map((bet) => (
                      <tr key={bet.id} className="hover:bg-gray-800/40 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.date}</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">{bet.tip}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${bet.stake}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300 font-bold">{bet.odds}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                            bet.result === 'win' ? 'bg-green-600 text-white' : 
                            bet.result === 'loss' ? 'bg-red-600 text-white' : 
                            'bg-yellow-600 text-white'
                          }`}>
                            {getResultIcon(bet.result)}
                            {bet.result}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${getResultColor(bet.result)}`}>
                          ${bet.payout}
                        </td>
                      </tr>
                    ))}
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
    </div>
  );
}

// Calendar icon component
function CalendarIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
} 