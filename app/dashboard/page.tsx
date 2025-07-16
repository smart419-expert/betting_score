'use client'

import { useState } from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon, MegaphoneIcon, UserGroupIcon, ChartBarIcon, GiftIcon, BoltIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Navbar } from './components/navbar';

const TIER_CONFIG = [
  {
    label: 'Tier 1',
    name: 'Basic',
    price: '$0/mo',
    badge: { text: 'Tier 1: Basic', color: 'bg-slate-600' },
    highlight: 'bg-slate-700 text-white border-slate-600',
    dashboard: {
      title: 'Welcome to Gambino AI',
      subtitle: 'Upgrade your tier to unlock more features.',
      notifications: [
        {
          icon: <MegaphoneIcon className="w-5 h-5 text-green-300" />, title: 'New Feature: Ticket Builder',
          desc: 'Premium users can now build custom tickets with multiple tips and generate booking codes!',
          color: 'bg-blue-900 border-blue-700'
        },
        {
          icon: <UserGroupIcon className="w-5 h-5 text-blue-300" />, title: 'Influencer Program Launch',
          desc: 'Join our influencer program and start earning from your successful predictions!',
          color: 'bg-blue-900 border-blue-700'
        },
        {
          icon: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-300" />, title: 'System Maintenance Tonight',
          desc: 'Brief maintenance scheduled for 2AM-4AM CAT. All services will be restored quickly.',
          color: 'bg-yellow-900 border-yellow-700'
        },
      ],
      stats: [
        { icon: <ChartBarIcon className="w-7 h-7 text-white" />, label: 'Daily Tips Limit', value: '3', locked: false },
        { icon: <BoltIcon className="w-7 h-7 text-white" />, label: 'Forex Signals', value: '---', locked: true },
        { icon: <BoltIcon className="w-7 h-7 text-white" />, label: 'AI Chat', value: '---', locked: true },
        { icon: <GiftIcon className="w-7 h-7 text-white" />, label: 'Your Points', value: '0', locked: false },
      ],
      upgrades: [
        { tier: 2, text: 'Upgrade', color: 'bg-yellow-600', locked: true },
        { tier: 2, text: 'Upgrade', color: 'bg-yellow-600', locked: true },
      ],
      featureCard: {
        title: 'Upgrade to G Mode (Tier 2)',
        desc: 'Unlock unlimited AI tips, forex signals, and the AI chat assistant.',
        color: 'bg-green-900 border-green-700 text-green-300',
      },
      fixtures: true,
    },
  },
  {
    label: 'Tier 2',
    name: 'G Mode',
    price: '$19/mo',
    badge: { text: 'Tier 2: G Mode', color: 'bg-cyan-600' },
    highlight: 'bg-cyan-700 text-white border-cyan-600',
    dashboard: {
      title: 'G Mode Dashboard',
      subtitle: 'Your intelligent betting companion.',
      notifications: [
        {
          icon: <MegaphoneIcon className="w-5 h-5 text-green-300" />, title: 'New Feature: Ticket Builder',
          desc: 'Premium users can now build custom tickets with multiple tips and generate booking codes!',
          color: 'bg-blue-900 border-blue-700'
        },
        {
          icon: <UserGroupIcon className="w-5 h-5 text-blue-300" />, title: 'Influencer Program Launch',
          desc: 'Join our influencer program and start earning from your successful predictions!',
          color: 'bg-blue-900 border-blue-700'
        },
        {
          icon: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-300" />, title: 'System Maintenance Tonight',
          desc: 'Brief maintenance scheduled for 2AM-4AM CAT. All services will be restored quickly.',
          color: 'bg-yellow-900 border-yellow-700'
        },
      ],
      stats: [
        { icon: <ChartBarIcon className="w-7 h-7 text-white" />, label: 'Sports Tips', value: '36', locked: false },
        { icon: <BoltIcon className="w-7 h-7 text-white" />, label: 'Forex Signals', value: '16', locked: false },
        { icon: <BoltIcon className="w-7 h-7 text-white" />, label: 'AI Chat Access', value: <CheckCircleIcon className="w-6 h-6 text-green-400" />, locked: false },
        { icon: <GiftIcon className="w-7 h-7 text-white" />, label: 'Reward Points', value: '0', locked: false },
      ],
      featureCard: {
        title: "Today's Key Content",
        desc: 'Latest AI Tips, Forex Signals',
        color: 'bg-slate-900 border-slate-700 text-yellow-300',
      },
      fixtures: true,
    },
  },
  {
    label: 'Tier 3',
    name: 'Pro',
    price: '$39/mo',
    badge: { text: 'Tier 3: Pro', color: 'bg-green-600' },
    highlight: 'bg-green-700 text-white border-green-600',
    dashboard: {
      title: 'Pro Dashboard',
      subtitle: 'Your intelligent betting companion.',
      notifications: [
        {
          icon: <MegaphoneIcon className="w-5 h-5 text-blue-300" />, title: 'Welcome to Gambino AI!',
          desc: 'Your intelligent prediction platform is ready. Explore AI-generated tips and signals.',
          color: 'bg-blue-900 border-blue-700'
        },
        {
          icon: <MegaphoneIcon className="w-5 h-5 text-green-300" />, title: 'New Feature: Ticket Builder',
          desc: 'Premium users can now build custom tickets with multiple tips and generate booking codes!',
          color: 'bg-blue-900 border-blue-700'
        },
        {
          icon: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-300" />, title: 'System Maintenance Tonight',
          desc: 'Brief maintenance scheduled for 2AM-4AM CAT. All services will be restored quickly.',
          color: 'bg-yellow-900 border-yellow-700'
        },
      ],
      stats: [
        { icon: <ChartBarIcon className="w-7 h-7 text-white" />, label: 'Sports Tips', value: '36', locked: false },
        { icon: <BoltIcon className="w-7 h-7 text-white" />, label: 'Forex Signals', value: '16', locked: false },
        { icon: <BoltIcon className="w-7 h-7 text-white" />, label: 'AI Chat Access', value: <CheckCircleIcon className="w-6 h-6 text-green-400" />, locked: false },
        { icon: <GiftIcon className="w-7 h-7 text-white" />, label: 'Reward Points', value: '0', locked: false },
      ],
      featureCard: {
        title: 'Upgrade to Pro (Tier 3)',
        desc: 'Access BetCast, Audio Spaces, and advanced features.',
        color: 'bg-green-900 border-green-700 text-green-300',
      },
      fixtures: true,
    },
  },
  {
    label: 'Tier 4',
    name: 'Influencer',
    price: '$79/mo',
    badge: { text: 'Tier 4: Influencer', color: 'bg-purple-700' },
    highlight: 'bg-purple-700 text-white border-purple-700',
    dashboard: {
      title: 'Influencer Dashboard',
      subtitle: 'Your intelligent betting companion.',
      notifications: [
        {
          icon: <MegaphoneIcon className="w-5 h-5 text-green-300" />, title: 'New Feature: Ticket Builder',
          desc: 'Premium users can now build custom tickets with multiple tips and generate booking codes!',
          color: 'bg-blue-900 border-blue-700'
        },
        {
          icon: <UserGroupIcon className="w-5 h-5 text-blue-300" />, title: 'Influencer Program Launch',
          desc: 'Join our influencer program and start earning from your successful predictions!',
          color: 'bg-blue-900 border-blue-700'
        },
        {
          icon: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-300" />, title: 'System Maintenance Tonight',
          desc: 'Brief maintenance scheduled for 2AM-4AM CAT. All services will be restored quickly.',
          color: 'bg-yellow-900 border-yellow-700'
        },
      ],
      stats: [
        { icon: <ChartBarIcon className="w-7 h-7 text-white" />, label: 'My Tips Created', value: '0', locked: false },
        { icon: <CheckCircleIcon className="w-7 h-7 text-white" />, label: 'Success Rate', value: '0%', locked: false },
        { icon: <UserGroupIcon className="w-7 h-7 text-white" />, label: 'Followers', value: '0', locked: false },
        { icon: <GiftIcon className="w-7 h-7 text-white" />, label: 'Monthly Earnings', value: '$580', locked: false },
      ],
      featureCard: {
        title: 'Influencer Hub (Tier 4)',
        desc: 'Exclusive tools and analytics for influencers. Publish tips, track your followers, and maximize your earnings.',
        color: 'bg-purple-900 border-purple-700 text-purple-300',
      },
      fixtures: true,
    },
  },
  {
    label: 'Tier 5',
    name: 'Admin',
    price: 'N/A/mo',
    badge: { text: 'Tier 5: Admin', color: 'bg-orange-700' },
    highlight: 'bg-orange-700 text-white border-orange-700',
    dashboard: {
      title: 'Admin Dashboard',
      subtitle: 'Your intelligent betting companion.',
      notifications: [
        {
          icon: <MegaphoneIcon className="w-5 h-5 text-green-300" />, title: 'New Feature: Ticket Builder',
          desc: 'Premium users can now build custom tickets with multiple tips and generate booking codes!',
          color: 'bg-blue-900 border-blue-700'
        },
        {
          icon: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-300" />, title: 'System Maintenance Tonight',
          desc: 'Brief maintenance scheduled for 2AM-4AM CAT. All services will be restored quickly.',
          color: 'bg-yellow-900 border-yellow-700'
        },
      ],
      stats: [
        { icon: <UserGroupIcon className="w-7 h-7 text-white" />, label: 'Total Users', value: '1,247', locked: false },
        { icon: <ChartBarIcon className="w-7 h-7 text-white" />, label: 'Active Subscribers', value: '834', locked: false },
        { icon: <BoltIcon className="w-7 h-7 text-white" />, label: 'AI Accuracy', value: '78%', locked: false },
        { icon: <GiftIcon className="w-7 h-7 text-white" />, label: 'Monthly Revenue', value: '$24,680', locked: false },
      ],
      featureCard: {
        title: 'Admin Controls (Tier 5)',
        desc: 'Manage users, system analytics, and AI management.',
        color: 'bg-red-900 border-red-700 text-red-300',
      },
      fixtures: true,
    },
  },
];

function TierSwitcher({ currentTier, setTier }: { currentTier: number, setTier: (idx: number) => void }) {
  return (
    <div className="bg-[#181A20] border border-yellow-900 rounded-lg p-4 mb-8 relative">
      <div className="flex items-center mb-2">
        <span className="text-yellow-400 mr-2">
          <svg className="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.631c.969 0 1.371 1.24.588 1.81l-5.37 3.905a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.37-3.905a1 1 0 00-1.175 0l-5.37 3.905c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118L2.342 11.727c-.783-.57-.38-1.81.588-1.81h6.631a1 1 0 00.95-.69l2.036-6.29z" /></svg>
        </span>
        <span className="font-semibold text-yellow-300">Demo Mode - Switch User Tier</span>
        <span className={`ml-auto text-xs px-3 py-1 rounded-full absolute top-3 right-4 ${TIER_CONFIG[currentTier].badge.color} text-white`}>{TIER_CONFIG[currentTier].badge.text}</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {TIER_CONFIG.map((tier, idx) => (
          <button
            key={tier.label}
            onClick={() => setTier(idx)}
            className={`flex-1 min-w-[120px] border rounded-lg px-4 py-2 text-center transition-all duration-150 ${idx === currentTier ? tier.highlight : 'bg-black text-white border-gray-700 hover:border-yellow-400'}`}
          >
            <div className="font-bold">{tier.label}</div>
            <div className="text-xs">{tier.name}</div>
            <div className="text-xs mt-1">{tier.price}</div>
          </button>
        ))}
      </div>
      <div className="text-xs text-gray-400 mt-2">Switch tiers to test different dashboard experiences. Click 'Influencer' to see publishing tools.</div>
    </div>
  );
}

function Notifications({ notifications }: { notifications: any[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2 text-white">Notifications</h2>
      <div className="space-y-2">
        {notifications.map((n, i) => (
          <div key={i} className={`flex items-start gap-3 p-4 rounded-lg border ${n.color}`}>
            <div className="mt-1">{n.icon}</div>
            <div>
              <div className="font-semibold text-white">{n.title}</div>
              <div className="text-sm text-gray-300">{n.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsCards({ stats }: { stats: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((s, i) => (
        <div key={i} className="bg-[#181A20] border border-gray-700 rounded-xl p-6 flex flex-col items-center text-white relative">
          <div className="mb-2">{s.icon}</div>
          <div className="text-sm text-gray-400 mb-1">{s.label}</div>
          <div className="text-2xl font-bold">{s.value}</div>
          {s.locked && <LockClosedIcon className="w-6 h-6 text-yellow-500 absolute top-3 right-3" />}
        </div>
      ))}
    </div>
  );
}

function FeatureCard({ feature, showUpgradeBtn, upgradeText }: { feature: any, showUpgradeBtn?: boolean, upgradeText?: string }) {
  return (
    <div className={`rounded-xl p-6 mb-6 border ${feature.color}] flex flex-col justify-start text-[#d7d5d5]`}>
      <div className="text-lg font-bold mb-2 flex items-center gap-2">{feature.title}</div>
      <div className="text-sm mb-4">{feature.desc}</div>
      {showUpgradeBtn && (
        <button className="bg-green-600 hover:bg-green-70 text-white font-bold text-base px-6 py-2 rounded mt-2 w-max shadow-md transition-all">
          {upgradeText || 'Upgrade Now - $19/month'}
        </button>
      )}
    </div>
  );
}

function KeyContentCard() {
  return (
    <div className="rounded-xl p-6 mb-6 border bg-[#181A20] border-slate-700 h-[18vh] flex flex-col justify-center w-full">
      <div className="flex flex-row h-full">
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-cyan-300 font-bold text-lg mb-1">Latest AI Tips</div>
          <div className="text-cyan-300 text-base">No tips available</div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="text-yellow-300 font-bold text-lg mb-1">Forex Signals</div>
          <div className="text-cyan-300 text-base">No signals available</div>
        </div>
      </div>
    </div>
  );
}

function getDateTabs() {
  const days = [];
  const today = new Date();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.push({ label: 'Today', date: new Date(today) });
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  days.push({ label: 'Tomorrow', date: tomorrow });
  for (let i = 2; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({ label: weekDays[d.getDay()], date: d });
  }
  return days;
}

function LiveFixtures({ onDayChange }: { onDayChange?: (date: Date) => void }) {
  const [selected, setSelected] = useState(0);
  const tabs = getDateTabs();

  // Example: call backend when day changes
  function handleSelect(idx: number) {
    setSelected(idx);
    if (onDayChange) onDayChange(tabs[idx].date);
  }

  // Mock fixtures for today/tomorrow, backend can use tabs[selected].date
  const fixtures = [
    {
      league: 'Premier League',
      home: 'Manchester United',
      away: 'Liverpool',
      time: '15:00',
    },
    {
      league: 'La Liga',
      home: 'Real Madrid',
      away: 'Barcelona',
      time: '17:00',
    },
  ];

  return (
    <div className="bg-[#181A20] border border-blue-700 rounded-xl p-6 text-blue-300 mb-6 h-[47vh]">
      <div className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-blue-400">&#9917;</span> Live Fixtures & Upcoming
      </div>
      <div className="flex gap-2 mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => handleSelect(idx)}
            className={`px-3 py-1 rounded font-semibold text-sm transition-all duration-150 ${selected === idx ? 'bg-blue-600 text-white' : 'bg-[#23262F] text-blue-200 hover:bg-blue-800'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {fixtures.map((fx, i) => (
          <div key={i} className="bg-[#23262F] rounded-lg p-4 mb-2 border border-blue-900">
            <div className="flex items-center justify-between mb-2">
              <span className="bg-blue-900 text-blue-200 text-xs px-2 py-0.5 rounded-full font-semibold">{fx.league}</span>
              <span className="bg-blue-900 text-blue-200 text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"><svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>{fx.time}</span>
            </div>
            <div className="font-bold text-white text-base">{fx.home}</div>
            <div className="text-white">{fx.away}</div>
            <button className="mt-3 bg-green-900 text-green-200 px-3 py-1 rounded text-xs font-semibold hover:bg-green-700">Today's Match - Click for Tips</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [currentTier, setTier] = useState(3); // Default to Tier 4 (Influencer)
  const tierData = TIER_CONFIG[currentTier];
  const dash = tierData.dashboard;

  return (
    <div className='jsx-38920fb5c616e4c5 relative min-h-screen flex flex-col bg-gradient-to-br from-[#101522] via-[#181d2a] to-[#1a2236] text-white overflow-hidden'>
      <Navbar name="Dashboard" />
      <div className="space-y-6 text-foreground min-h-screen px-[4rem] py-[4rem]">
        <TierSwitcher currentTier={currentTier} setTier={setTier} />
        <h1 className="text-4xl font-bold text-white mb-1">{dash.title}</h1>
        <p className="text-gray-300 mb-6">{dash.subtitle}</p>
        <Notifications notifications={dash.notifications} />
        <StatsCards stats={dash.stats} />

        {currentTier === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="h-full flex flex-col justify-stretch">
              <KeyContentCard />
            </div>
            <div className="h-full flex flex-col justify-stretch">
              <FeatureCard
                feature={{
                  title: <span className="text-green-400 font-bold text-lg flex items-center gap-2"><svg className="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.631c.969 0 1.371 1.24.588 1.81l-5.37 3.905a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.37-3.905a1 1 0 00-1.175 0l-5.37 3.905c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118L2.342 11.727c-.783-.57-.38-1.81.588-1.81h6.631a1 1 0 00.95-.69l2.036-6.29z" /></svg>Upgrade to Pro (Tier 3)</span>,
                  desc: <span className="text-green-300">Access BetCast, Audio Spaces, and advanced features.</span>,
                  color: 'bg-[#181A20] border-green-700',
                }}
                showUpgradeBtn={true}
                upgradeText="Upgrade to Pro - $39/month"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="h-full">
              <FeatureCard feature={dash.featureCard} showUpgradeBtn={currentTier === 0} />
            </div>
            <div className="h-full">
              {dash.fixtures && <LiveFixtures />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
