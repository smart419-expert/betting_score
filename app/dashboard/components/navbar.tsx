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
} from '@heroicons/react/24/outline';
import React from 'react'

const icons = {
    'Feed': HomeIcon,
    'Dashboard': ChartBarIcon,
    'Sports Preview': TrophyIcon,
    'Forex Preview': CurrencyDollarIcon,
    'Gambino AI': ChatBubbleLeftRightIcon,
    'Ticket Builder': CogIcon,
    'Collaboration': UsersIcon,
    'My Profile': UserIcon,
    'Wallet': WalletIcon,
    'Settings': Cog6ToothIcon,
    'My Account': LifebuoyIcon,
};

export default function Navbar({ location }: { location: string }) {
    const Icon = icons[location as keyof typeof icons];
    return (
        <div className="relative z-10 flex items-center gap-3 px-8 py-7 border-b border-white/10 bg-gradient-to-r from-blue-900/80 via-[#181d2a]/90 to-purple-900/80 backdrop-blur-xl shadow-xl">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <Icon className="w-6 h-6 text-white drop-shadow-glow" />
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent drop-shadow-glow">{location}</h1>
        </div>
    )
}