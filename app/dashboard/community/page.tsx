'use client';

import React, { useState } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon, 
  StarIcon, 
  PlusIcon, 
  PaperAirplaneIcon,
  HeartIcon,
  ShareIcon,
  UserCircleIcon,
  // CrownIcon,
  FireIcon,
  TrophyIcon,
  BellIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { Navbar } from '../components/navbar';

// Mock data for chatrooms
const chatrooms = [
  { id: 1, name: 'Premier League', members: 1247, online: 89, icon: '⚽', color: 'bg-blue-600' },
  { id: 2, name: 'La Liga', members: 892, online: 45, icon: '⚽', color: 'bg-red-600' },
  { id: 3, name: 'Serie A', members: 654, online: 32, icon: '⚽', color: 'bg-green-600' },
  { id: 4, name: 'Forex Trading', members: 445, online: 67, icon: '📈', color: 'bg-yellow-600' },
  { id: 5, name: 'Tennis Tips', members: 234, online: 23, icon: '🎾', color: 'bg-purple-600' },
];

// Mock data for influencers
const influencers = [
  { 
    id: 1, 
    name: 'Alex Pro', 
    avatar: '👨‍💼', 
    followers: 15420, 
    winRate: 78, 
    status: 'online',
    specialty: 'Premier League',
    lastTip: '2 hours ago',
    tip: 'Man United vs Liverpool - Over 2.5 Goals @ 1.95'
  },
  { 
    id: 2, 
    name: 'Sarah Elite', 
    avatar: '👩‍💼', 
    followers: 8920, 
    winRate: 82, 
    status: 'online',
    specialty: 'Forex',
    lastTip: '1 hour ago',
    tip: 'EUR/USD - Buy @ 1.0850, SL: 1.0820, TP: 1.0900'
  },
  { 
    id: 3, 
    name: 'Mike Master', 
    avatar: '👨‍💼', 
    followers: 12340, 
    winRate: 75, 
    status: 'offline',
    specialty: 'La Liga',
    lastTip: '3 hours ago',
    tip: 'Real Madrid vs Barcelona - BTTS @ 1.70'
  },
];

// Mock data for collab bets
const collabBets = [
  {
    id: 1,
    creator: 'Alex Pro',
    title: 'Weekend Multi-Bet',
    description: 'High confidence picks for this weekend\'s matches',
    participants: 12,
    maxParticipants: 20,
    stake: 50,
    potentialPayout: 450,
    tips: [
      'Man United vs Liverpool - Over 2.5 Goals @ 1.95',
      'Real Madrid vs Barcelona - BTTS @ 1.70',
      'Arsenal vs Chelsea - Arsenal Win @ 2.10'
    ],
    confidence: 85,
    status: 'open'
  },
  {
    id: 2,
    creator: 'Sarah Elite',
    title: 'Forex Friday',
    description: 'Weekly forex signals with high probability setups',
    participants: 8,
    maxParticipants: 15,
    stake: 100,
    potentialPayout: 850,
    tips: [
      'EUR/USD - Buy @ 1.0850, SL: 1.0820, TP: 1.0900',
      'GBP/USD - Sell @ 1.2650, SL: 1.2680, TP: 1.2600'
    ],
    confidence: 88,
    status: 'open'
  }
];

// Mock chat messages
const mockMessages = [
  { id: 1, user: 'Alex Pro', message: 'What do you think about the Man United game tonight?', time: '2 min ago', avatar: '👨‍💼' },
  { id: 2, user: 'Sarah Elite', message: 'I\'m going with Over 2.5 goals. Both teams are in good form.', time: '1 min ago', avatar: '👩‍💼' },
  { id: 3, user: 'Mike Master', message: 'Agreed! The H2H stats support this prediction.', time: '30 sec ago', avatar: '👨‍💼' },
];

export default function CollaborationPage() {
  const [selectedChatroom, setSelectedChatroom] = useState(chatrooms[0]);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chatrooms' | 'collab' | 'influencers'>('chatrooms');
  const [showCreateCollab, setShowCreateCollab] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      setMessage('');
    }
  };

  const joinCollabBet = (betId: number) => {
    // In a real app, this would join the collaborative bet
    alert(`Joined collaborative bet ${betId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-900">
      <Navbar name="Collaboration" />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Community & Collaboration</h1>
            <p className="text-gray-300">Connect with fellow tipsters, join collaborative bets, and learn from influencers</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-900/50 rounded-xl p-1 mb-8">
            <button
              onClick={() => setActiveTab('chatrooms')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'chatrooms' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Chatrooms
            </button>
            <button
              onClick={() => setActiveTab('collab')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'collab' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <UserGroupIcon className="w-5 h-5" />
              Collab Bets
            </button>
            <button
              onClick={() => setActiveTab('influencers')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'influencers' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {/* <CrownIcon className="w-5 h-5" /> */}
              Influencers
            </button>
          </div>

          {/* Chatrooms Tab */}
          {activeTab === 'chatrooms' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Chatroom List */}
              <div className="lg:col-span-1">
                <div className="bg-[#181A20] rounded-2xl border border-blue-800 p-6">
                  <h2 className="text-xl font-bold text-blue-200 mb-4">Chatrooms</h2>
                  <div className="space-y-3">
                    {chatrooms.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => setSelectedChatroom(room)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                          selectedChatroom.id === room.id 
                            ? 'bg-blue-600/20 border border-blue-500' 
                            : 'bg-gray-800/50 hover:bg-gray-800/70'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full ${room.color} flex items-center justify-center text-white font-bold`}>
                          {room.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-white">{room.name}</div>
                          <div className="text-sm text-gray-400">
                            {room.online} online • {room.members} members
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="lg:col-span-2">
                <div className="bg-[#181A20] rounded-2xl border border-blue-800 flex flex-col h-[600px]">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${selectedChatroom.color} flex items-center justify-center text-white font-bold`}>
                        {selectedChatroom.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{selectedChatroom.name}</h3>
                        <p className="text-sm text-gray-400">{selectedChatroom.online} online</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <BellIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {mockMessages.map((msg) => (
                      <div key={msg.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm">
                          {msg.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">{msg.user}</span>
                            <span className="text-xs text-gray-400">{msg.time}</span>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-3 text-gray-200">
                            {msg.message}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-6 border-t border-gray-700">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl transition-colors"
                      >
                        <PaperAirplaneIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Collab Bets Tab */}
          {activeTab === 'collab' && (
            <div className="space-y-6">
              {/* Header with Create Button */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-blue-200">Collaborative Bets</h2>
                <button
                  onClick={() => setShowCreateCollab(true)}
                  className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                  Create Collab Bet
                </button>
              </div>

              {/* Collab Bets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collabBets.map((bet) => (
                  <div key={bet.id} className="bg-[#181A20] rounded-2xl border border-blue-800 p-6 hover:border-blue-600 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-white text-lg mb-1">{bet.title}</h3>
                        <p className="text-gray-400 text-sm">{bet.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        bet.status === 'open' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                      }`}>
                        {bet.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Creator:</span>
                        <span className="text-white font-semibold">{bet.creator}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Participants:</span>
                        <span className="text-white">{bet.participants}/{bet.maxParticipants}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Stake:</span>
                        <span className="text-white font-semibold">${bet.stake}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Potential Payout:</span>
                        <span className="text-green-400 font-bold">${bet.potentialPayout}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">Confidence:</span>
                        <div className="flex items-center gap-1">
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${bet.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-green-400 font-bold text-sm">{bet.confidence}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-semibold text-white text-sm">Tips:</h4>
                      {bet.tips.map((tip, index) => (
                        <div key={index} className="text-sm text-gray-300 bg-gray-800/50 rounded-lg p-2">
                          {tip}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => joinCollabBet(bet.id)}
                      disabled={bet.status !== 'open'}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors"
                    >
                      Join Collab Bet
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Influencers Tab */}
          {activeTab === 'influencers' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-200">Top Influencers</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {influencers.map((influencer) => (
                  <div key={influencer.id} className="bg-[#181A20] rounded-2xl border border-blue-800 p-6 hover:border-blue-600 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl">
                          {influencer.avatar}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">{influencer.name}</h3>
                          <p className="text-gray-400 text-sm">{influencer.specialty}</p>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        influencer.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Followers:</span>
                        <span className="text-white font-semibold">{influencer.followers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Win Rate:</span>
                        <span className="text-green-400 font-bold">{influencer.winRate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Last Tip:</span>
                        <span className="text-white">{influencer.lastTip}</span>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                      <h4 className="font-semibold text-white text-sm mb-2">Latest Tip:</h4>
                      <p className="text-gray-300 text-sm">{influencer.tip}</p>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold transition-colors">
                        Follow
                      </button>
                      <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 