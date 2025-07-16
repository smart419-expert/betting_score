"use client";

import React, { useState } from 'react';
import {
  BellIcon,
  HeartIcon,
  PlusIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
  FireIcon,
  StarIcon,
  TrophyIcon,
  UserCircleIcon,
  ClockIcon,
  ChartBarIcon,
  EyeIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Navbar } from '../components/navbar';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedPost {
  id: string;
  type: 'tip' | 'forex' | 'community' | 'influencer' | 'betcast';
  author: {
    id: string;
    name: string;
    avatar: string;
    tier: 'Free' | 'Starter' | 'Pro' | 'Elite' | 'Influencer';
    verified: boolean;
  };
  content: {
    title: string;
    description: string;
    sport?: string;
    match?: string;
    tip?: string;
    odds?: number;
    confidence?: number;
    entry?: string;
    stopLoss?: string;
    takeProfit?: string;
    chartImage?: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    accuracy?: number;
  };
  timestamp: string;
  isLiked: boolean;
  isBookmarked: boolean;
  isPremium: boolean;
  tags: string[];
}

const mockFeedData: FeedPost[] = [
  {
    id: '1',
    type: 'tip',
    author: {
      id: '1',
      name: 'Alex Thompson',
      avatar: '/api/placeholder/4040',
      tier: 'Influencer',
      verified: true
    },
    content: {
      title: 'Premier League: Arsenal vs Chelsea',
      description: 'Strong data suggests Arsenal will dominate possession and create multiple scoring opportunities. Their recent form and home advantage make this a high-confidence pick.',
      sport: 'Football',
      match: 'Arsenal vs Chelsea',
      tip: 'Arsenal Win & Over 1.5 Goals',
      odds: 2.15,
      confidence: 87
    },
    stats: {
      likes: 234,
      comments: 45,
      shares: 12,
      views: 1247,
      accuracy: 78
    },
    timestamp: '2 hours ago',
    isLiked: false,
    isBookmarked: false,
    isPremium: false,
    tags: ['Premier League', 'High Confidence', 'Home Win']
  },
  {
    id: '2',
    type: 'forex',
    author: {
      id: '2',
      name: 'Sarah Chen',
      avatar: '/api/placeholder/4040',
      tier: 'Elite',
      verified: true
    },
    content: {
      title: 'EUR/USD Signal',
      description: 'Technical analysis shows strong support at 1.0085. Risk-reward ratio is favorable with clear entry and exit points.',
      entry: '1.00875',
      stopLoss: '1.0084',
      takeProfit: '1.0920',
      chartImage: '/api/placeholder/40'
    },
    stats: {
      likes: 156,
      comments: 23,
      shares: 8,
      views: 892,
      accuracy: 82
    },
    timestamp: '4 hours ago',
    isLiked: true,
    isBookmarked: true,
    isPremium: true,
    tags: ['Forex', 'EUR/USD', 'Technical Analysis']
  },
  {
    id: '3',
    type: 'betcast',
    author: {
      id: '3',
      name: 'Mike Rodriguez',
      avatar: '/api/placeholder/4040',
      tier: 'Influencer',
      verified: true
    },
    content: {
      title: 'Weekend BetCast Preview',
      description: "This week's audio forecast covers 20 major matches with exclusive insights from professional tipsters. Available for Pro+ subscribers.",
      sport: 'Mixed'
    },
    stats: {
      likes: 89,
      comments: 15,
      shares: 34,
      views: 567
    },
    timestamp: '1 day ago',
    isLiked: false,
    isBookmarked: false,
    isPremium: true,
    tags: ['BetCast', 'Premium', 'Audio']
  },
  {
    id: '4',
    type: 'community',
    author: {
      id: '4',
      name: 'David Kim',
      avatar: '/api/placeholder/4040',
      tier: 'Pro',
      verified: false
    },
    content: {
      title: 'Community Discussion: Bankroll Management',
      description: "What's your strategy for managing betting bankroll? I've been using the 2% rule per bet and it's been working well for me. Share your experiences!",
    },
    stats: {
      likes: 67,
      comments: 89,
      shares: 5,
      views: 445,
    },
    timestamp: '3 hours ago',
    isLiked: false,
    isBookmarked: false,
    isPremium: false,
    tags: ['Community', 'Bankroll', 'Strategy']
  },
  {
    id: '5',
    type: 'tip',
    author: {
      id: '5',
      name: 'Emma Wilson',
      avatar: '/api/placeholder/4040',
      tier: 'Elite',
      verified: true
    },
    content: {
      title: 'Tennis: Djokovic vs Medvedev',
      description: "Djokovic's recent form and head-to-head record against Medvedev on hard courts makes this a solid pick. High confidence based on historical data.",
      sport: 'Tennis',
      match: 'Djokovic vs Medvedev',
      tip: 'Djokovic Win',
      odds: 1.65,
      confidence: 91
    },
    stats: {
      likes: 198,
      comments: 32,
      shares: 18,
      views: 1103,
      accuracy: 85
    },
    timestamp: '6 hours ago',
    isLiked: true,
    isBookmarked: true,
    isPremium: false,
    tags: ['Tennis', 'Grand Slam', 'High Confidence']
  }
];

export default function FeedPage() {
  const [feedData, setFeedData] = useState<FeedPost[]>(mockFeedData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const filters = [
    { id: 'all', label: 'All Posts', icon: <EyeIcon className="w-4 h-4" /> },
    { id: 'tip', label: 'Tips', icon: <TrophyIcon className="w-4 h-4" /> },
    { id: 'forex', label: 'Forex', icon: <ArrowTrendingUpIcon className="w-4 h-4" /> },
    { id: 'community', label: 'Community', icon: <ChatBubbleLeftIcon className="w-4 h-4" /> },
    { id: 'influencer', label: 'Influencers', icon: <StarIcon className="w-4 h-4" /> },
    { id: 'betcast', label: 'BetCast', icon: <FireIcon className="w-4 h-4" /> }
  ];

  const sortOptions = [
    { id: 'latest', label: 'Latest' },
    { id: 'trending', label: 'Trending' },
    { id: 'confidence', label: 'High Confidence' },
    { id: 'accuracy', label: 'Best Accuracy' }
  ];

  const handleLike = (postId: string) => {
    setFeedData(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          stats: {
            ...post.stats,
            likes: post.isLiked ? post.stats.likes - 1 : post.stats.likes + 1
          }
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId: string) => {
    setFeedData(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, isBookmarked: !post.isBookmarked };
      }
      return post;
    }));
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Influencer': return 'bg-purple-600';
      case 'Elite': return 'bg-yellow-600';
      case 'Pro': return 'bg-blue-600';
      case 'Starter': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'tip': return <TrophyIcon className="w-4 h-4 text-green-400" />;
      case 'forex': return <ArrowTrendingUpIcon className="w-4 h-4 text-blue-400" />;
      case 'community': return <ChatBubbleLeftIcon className="w-4 h-4 text-purple-400" />;
      case 'influencer': return <StarIcon className="w-4 h-4 text-yellow-400" />;
      case 'betcast': return <FireIcon className="w-4 h-4 text-orange-400" />;
      default: return <EyeIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredFeed = feedData.filter(post => 
    activeFilter === 'all' || post.type === activeFilter
  );

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#101522] via-[#181d2a] to-[#1a2236] text-white overflow-hidden">
      <Navbar name="Feed" />
      <div className="flex-1 px-8 py-6">
        {/* Filters and Actions */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Filter Tabs */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 bg-gray-800 rounded-lg p-1">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                    activeFilter === filter.id 
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {filter.icon}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          {/* Sort and Actions */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            <button
              onClick={() => setShowCreatePost(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />Create Post
            </button>
          </div>
        </div>
        {/* Feed Content */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredFeed.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full bg-gray-700"
                      />
                      {post.author.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                          <StarIcon className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{post.author.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full text-white ${getTierColor(post.author.tier)}`}>{post.author.tier}</span>
                        {post.isPremium && (
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-600">Premium</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        {getPostTypeIcon(post.type)}
                        <span>{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</span>
                        <span>•</span>
                        <ClockIcon className="w-4 h-4" />
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white" onClick={() => handleBookmark(post.id)}>
                    <BookmarkIcon className={`w-5 h-5 ${post.isBookmarked ? 'text-yellow-400 fill-current' : ''}`} />
                  </button>
                </div>
                {/* Post Content */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">{post.content.title}</h4>
                  <p className="text-gray-300 mb-3">{post.content.description}</p>
                  {/* Tip Details */}
                  {post.type === 'tip' && post.content.tip && (
                    <div className="bg-gray-700 rounded-lg p-4 mb-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm text-gray-400">Tip</span>
                          <div className="text-white font-medium">{post.content.tip}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">Odds</span>
                          <div className="text-green-400 font-bold">{post.content.odds}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">Confidence</span>
                          <div className="text-yellow-400 font-bold">{post.content.confidence}%</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Forex Details */}
                  {post.type === 'forex' && (
                    <div className="bg-gray-700 rounded-lg p-4 mb-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm text-gray-400">Entry</span>
                          <div className="text-green-400 font-bold">{post.content.entry}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">Stop Loss</span>
                          <div className="text-red-400 font-bold">{post.content.stopLoss}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">Take Profit</span>
                          <div className="text-blue-400 font-bold">{post.content.takeProfit}</div>
                        </div>
                      </div>
                      {post.content.chartImage && (
                        <img src={post.content.chartImage} alt="Chart" className="w-full mt-3 rounded" />
                      )}
                    </div>
                  )}
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Post Stats and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      {post.isLiked ? (
                        <HeartSolidIcon className="w-5 h-5 text-red-400" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                      <span>{post.stats.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <ChatBubbleLeftIcon className="w-5 h-5" />
                      <span>{post.stats.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
                      <ShareIcon className="w-5 h-5" />
                      <span>{post.stats.shares}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      <span>{post.stats.views}</span>
                    </div>
                    {post.stats.accuracy && (
                      <div className="flex items-center gap-1">
                        <ChartBarIcon className="w-4 h-4" />
                        <span>{post.stats.accuracy}% accuracy</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
} 