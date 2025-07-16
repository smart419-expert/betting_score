'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrophyIcon, 
  ClockIcon, 
  StarIcon,
  MagnifyingGlassIcon,
  ViewColumnsIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon,
  CalculatorIcon,
  ArrowTrendingUpIcon,
  ChevronUpIcon, ChevronDownIcon
} from '@heroicons/react/24/outline';
import { Navbar } from '../components/navbar';
import { Dialog } from '@headlessui/react';
import { fetchLiveMatches, fetchOdds } from '../APIdata/footballApi';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface BettingTip {
  id: string;
  league: string;
  confidence: {
    level: 'High' | 'Medium' | 'Low';
    percentage: number;
  };
  match: {
    homeTeam: string;
    awayTeam: string;
    date: string;
    time: string;
    status: string;
  };
  tip: {
    type: string;
    specific: string;
    odds: number;
    rationale: string;
  };
  generatedAt: string;
}

const mockTips: BettingTip[] = [
  {
    id: '1',
    league: 'UEFA Women\'s Euro 2025',
    confidence: { level: 'High', percentage: 90 },
    match: {
      homeTeam: 'England Women',
      awayTeam: 'Netherlands Women',
      date: 'Tuesday, July 1, 2025',
      time: '16:00',
      status: 'Time Until Match: Match Started'
    },
    tip: {
      type: 'Over 1.5 Goals',
      specific: 'Over 1.5 Goals',
      odds: 2.15,
      rationale: 'Both teams have demonstrated strong offensive capabilities in recent matches, with England averaging 2.3 goals per game and Netherlands 1.8 goals per game.'
    },
    generatedAt: 'Jul 9, 07:58'
  },
  {
    id: '2',
    league: 'FIFA Club World Cup',
    confidence: { level: 'Medium', percentage: 70 },
    match: {
      homeTeam: 'Real Madrid',
      awayTeam: 'Juventus',
      date: 'Wednesday, December 31, 1969',
      time: '19:00',
      status: 'Time Until Match: Match Started'
    },
    tip: {
      type: 'Under 2.5 Goals',
      specific: 'Under 2.5 Goals',
      odds: 1.85,
      rationale: 'Both teams have solid defenses and this is a high-stakes match where both sides will be cautious.'
    },
    generatedAt: 'Jul 9, 08:15'
  },
  {
    id: '3',
    league: 'UEFA Women\'s Euro 2025',
    confidence: { level: 'High', percentage: 85 },
    match: {
      homeTeam: 'Germany Women',
      awayTeam: 'Poland Women',
      date: 'Tuesday, July 1, 2025',
      time: '19:30',
      status: 'Time Until Match: 2 hours'
    },
    tip: {
      type: 'Player Props - Player to Score Anytime',
      specific: 'Alexandra Popp to Score Anytime',
      odds: 3.20,
      rationale: 'Popp has scored in 4 of her last 5 matches and has a strong record against Poland.'
    },
    generatedAt: 'Jul 9, 08:30'
  },
  {
    id: '4',
    league: 'FIFA Club World Cup',
    confidence: { level: 'Medium', percentage: 75 },
    match: {
      homeTeam: 'Fluminense',
      awayTeam: 'Chelsea',
      date: 'Wednesday, December 31, 1969',
      time: '21:00',
      status: 'Time Until Match: 4 hours'
    },
    tip: {
      type: 'Half-Time Goals Over 0.5',
      specific: 'Over 0.5',
      odds: 1.95,
      rationale: 'Both teams have scored in the first half in 70% of their recent matches.'
    },
    generatedAt: 'Jul 9, 08:45'
  }
];

export default function SportsPreviewPage() {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [selectedTips, setSelectedTips] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'league' | 'datetime' | 'odds' | 'confidence'>('datetime');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [stake, setStake] = useState(3);
  const [search, setSearch] = useState('');
  const [confidenceFilter, setConfidenceFilter] = useState({ High: true, Medium: true, Low: true });
  const [betSlipOpen, setBetSlipOpen] = useState(false);
  const [tips, setTips] = useState<BettingTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTips() {
      setLoading(true);
      setError(null);
      try {
        const matches = await fetchLiveMatches();
        // For each match, fetch odds and normalize to BettingTip
        const tipsData: BettingTip[] = await Promise.all(matches.slice(0, 10).map(async (match: any) => {
          let odds = 0;
          let tipType = '1X2';
          let tipSpecific = 'Home Win';
          let rationale = 'Data-driven suggestion based on team form, odds, and stats.';
          let confidence = { level: 'Medium', percentage: 75 };
          try {
            const oddsData = await fetchOdds(match.fixture.id);
            // Example: get home win odds from bookmaker 0
            if (oddsData && oddsData[0] && oddsData[0].bookmakers[0]) {
              const homeWin = oddsData[0].bookmakers[0].bets[0].values.find((v: any) => v.value === 'Home');
              if (homeWin) {
                odds = homeWin.odd;
                tipType = oddsData[0].bookmakers[0].bets[0].name;
                tipSpecific = 'Home Win';
                rationale = `Home win odds: ${homeWin.odd}`;
                confidence = { level: 'High', percentage: 90 };
              }
            }
          } catch (e) {
            // fallback
          }
          return {
            id: match.fixture.id.toString(),
            league: match.league.name,
            confidence,
            match: {
              homeTeam: match.teams.home.name,
              awayTeam: match.teams.away.name,
              date: match.fixture.date.split('T')[0],
              time: match.fixture.date.split('T')[1]?.slice(0,5) || '',
              status: match.fixture.status.long,
            },
            tip: {
              type: tipType,
              specific: tipSpecific,
              odds: Number(odds) || 1.5,
              rationale,
            },
            generatedAt: new Date().toLocaleString(),
          };
        }));
        setTips(tipsData);
      } catch (e: any) {
        setError('Failed to load live tips. Showing mock data.');
        setTips(mockTips);
      } finally {
        setLoading(false);
      }
    }
    loadTips();
  }, []);

  // Filtered tips based on search and confidence
  const filteredTips = tips.filter(tip => {
    const searchLower = search.toLowerCase();
    const matchesSearch = (
      tip.league.toLowerCase().includes(searchLower) ||
      tip.match.homeTeam.toLowerCase().includes(searchLower) ||
      tip.match.awayTeam.toLowerCase().includes(searchLower) ||
      tip.tip.type.toLowerCase().includes(searchLower) ||
      tip.tip.specific.toLowerCase().includes(searchLower)
    );
    const matchesConfidence = confidenceFilter[tip.confidence.level];
    return matchesSearch && matchesConfidence;
  });

  const selectedTipsData = filteredTips.filter(tip => selectedTips.includes(tip.id));
  const totalOdds = selectedTipsData.reduce((acc, tip) => acc * tip.tip.odds, 1);
  const potentialReturn = stake * totalOdds;
  // Risk level logic (simple average for demo)
  const avgConfidence = selectedTipsData.length ? selectedTipsData.reduce((acc, tip) => acc + tip.confidence.percentage, 0) / selectedTipsData.length : 0;
  let riskLevel = 'Medium';
  let riskLevelColor = 'bg-yellow-700 text-yellow-200';
  if (avgConfidence >= 85) { riskLevel = 'High'; riskLevelColor = 'bg-green-700 text-green-200'; }
  else if (avgConfidence <= 70) { riskLevel = 'Low'; riskLevelColor = 'bg-red-700 text-red-200'; }

  const getConfidenceColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-green-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      case 'Low': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const addToSlip = (tipId: string) => {
    if (!selectedTips.includes(tipId)) {
      setSelectedTips([...selectedTips, tipId]);
    }
  };

  const removeFromSlip = (tipId: string) => {
    setSelectedTips(selectedTips.filter(id => id !== tipId));
  };

  // Sorting logic (use filteredTips)
  const sortedTips = [...filteredTips].sort((a, b) => {
    let valA, valB;
    switch (sortBy) {
      case 'league':
        valA = a.league.toLowerCase();
        valB = b.league.toLowerCase();
        break;
      case 'datetime':
        valA = new Date(`${a.match.date} ${a.match.time}`).getTime();
        valB = new Date(`${b.match.date} ${b.match.time}`).getTime();
        break;
      case 'odds':
        valA = a.tip.odds;
        valB = b.tip.odds;
        break;
      case 'confidence':
        valA = a.confidence.percentage;
        valB = b.confidence.percentage;
        break;
      default:
        valA = 0; valB = 0;
    }
    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: 'league' | 'datetime' | 'odds' | 'confidence') => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
  };

  // Render loading spinner or error
  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner /></div>;
  if (error) return <div className="text-center text-red-400 py-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-900">
      <Navbar name="Sports Preview" />
      <div className="flex flex-col lg:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Sports Betting Tips</h1>
              <p className="text-gray-300">AI-powered predictions with real-time booking codes</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition">
              <StarIcon className="w-5 h-5" />
              Generate New Tips
            </button>
          </div>

          {/* Search Bar & Confidence Filter */}
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[220px]">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by team, league, or tip type..."
                className="w-full bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 shadow"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
            <div className="flex items-center gap-2 bg-gray-900/60 border border-gray-700 rounded-lg px-3 py-2">
              {(['High', 'Medium', 'Low'] as const).map(level => (
                <label key={level} className="flex items-center gap-1 text-xs font-semibold text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confidenceFilter[level]}
                    onChange={() => setConfidenceFilter(f => ({ ...f, [level]: !f[level] }))}
                    className={`accent-${level === 'High' ? 'green' : level === 'Medium' ? 'yellow' : 'red'}-500 mr-1`}
                  />
                  <span className={`px-2 py-0.5 rounded-full ${level === 'High' ? 'bg-green-600' : level === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'} text-white`}>{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-2 mb-6 border border-gray-700 inline-flex">
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                viewMode === 'card' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ViewColumnsIcon className="w-5 h-5" />
              Card View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                viewMode === 'table' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <TableCellsIcon className="w-5 h-5" />
              Table View
            </button>
          </div>

          {/* Tips Grid or Table */}
          {viewMode === 'card' ? (
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 md:gap-6">
              <AnimatePresence>
                {sortedTips.map((tip, index) => (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700 w-full sm:w-[22rem] md:w-[30rem] mx-auto"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">{tip.league}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getConfidenceColor(tip.confidence.level)}`}>{tip.confidence.level} ({tip.confidence.percentage}%)</span>
                      </div>
                      <button className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition">
                        <InformationCircleIcon className="w-5 h-5" />
                      </button>
                    </div>
                    {/* Match Info */}
                    <div className="mb-4">
                      <div className="text-lg font-semibold text-white mb-2">{tip.match.homeTeam} vs {tip.match.awayTeam}</div>
                      <div className="text-sm text-gray-400 mb-1">{tip.match.date} – {tip.match.time}</div>
                      <div className="text-sm text-gray-400 mb-1">{tip.match.status}</div>
                      <div className="text-sm text-gray-400">Tip Generated: {tip.generatedAt}</div>
                    </div>
                    {/* Betting Tip */}
                    <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-400">{tip.tip.type}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white">{tip.tip.odds}</span>
                          <ArrowTrendingUpIcon className="w-5 h-5 text-green-400" />
                        </div>
                      </div>
                      <div className="text-white font-semibold mb-2">{tip.tip.specific}</div>
                      <div className="text-sm text-gray-300">{tip.tip.rationale}</div>
                    </div>
                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => addToSlip(tip.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                      >
                        <PlusIcon className="w-4 h-4" />
                        Add to Slip
                      </button>
                      <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-800 transition">
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                        Discuss
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900/50 backdrop-blur-sm">
              <table className="min-w-full divide-y divide-gray-700 text-xs sm:text-sm">
                <thead className="bg-gray-900/70">
                  <tr>
                    <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort('league')}>League{sortBy === 'league' && (sortDir === 'asc' ? <ChevronUpIcon className="inline w-4 h-4 ml-1 text-blue-400" /> : <ChevronDownIcon className="inline w-4 h-4 ml-1 text-blue-400" />)}</th>
                    <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort('datetime')}>Match / Date{sortBy === 'datetime' && (sortDir === 'asc' ? <ChevronUpIcon className="inline w-4 h-4 ml-1 text-blue-400" /> : <ChevronDownIcon className="inline w-4 h-4 ml-1 text-blue-400" />)}</th>
                    <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider hidden md:table-cell">Tip</th>
                    <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort('odds')}>Odds{sortBy === 'odds' && (sortDir === 'asc' ? <ChevronUpIcon className="inline w-4 h-4 ml-1 text-blue-400" /> : <ChevronDownIcon className="inline w-4 h-4 ml-1 text-blue-400" />)}</th>
                    <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort('confidence')}>Confidence{sortBy === 'confidence' && (sortDir === 'asc' ? <ChevronUpIcon className="inline w-4 h-4 ml-1 text-blue-400" /> : <ChevronDownIcon className="inline w-4 h-4 ml-1 text-blue-400" />)}</th>
                    <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {sortedTips.map((tip) => (
                    <tr key={tip.id} className="hover:bg-gray-800/40 transition">
                      <td className="px-2 sm:px-4 py-3 text-gray-200">{tip.league}</td>
                      <td className="px-2 sm:px-4 py-3 text-white font-semibold">{tip.match.homeTeam} <span className="text-gray-400">vs</span> {tip.match.awayTeam}<br/><span className="text-xs text-gray-500">{tip.match.date} {tip.match.time}</span></td>
                      <td className="px-2 sm:px-4 py-3 text-blue-300 font-semibold hidden md:table-cell">{tip.tip.specific}<br/><span className="text-xs text-gray-400">{tip.tip.type}</span></td>
                      <td className="px-2 sm:px-4 py-3 text-green-400 font-bold">{tip.tip.odds}</td>
                      <td className="px-2 sm:px-4 py-3"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${getConfidenceColor(tip.confidence.level)}`}>{tip.confidence.level} ({tip.confidence.percentage}%)</span></td>
                      <td className="px-2 sm:px-4 py-3"><div className="flex gap-2 flex-wrap"><button onClick={() => addToSlip(tip.id)} className="bg-blue-600 hover:bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-lg font-semibold flex items-center gap-1 text-xs transition"><PlusIcon className="w-4 h-4" />Add</button><button className="border border-gray-600 text-gray-300 rounded-lg font-semibold flex items-center gap-1 px-2 sm:px-3 py-1 hover:bg-gray-800 text-xs transition"><ChatBubbleLeftRightIcon className="w-4 h-4" />Discuss</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bet Slip Sidebar: hidden on mobile, shown on lg+ */}
        <div className="hidden lg:flex w-[25rem] bg-gray-900/80 backdrop-blur-sm border-l border-gray-700 p-6 relative flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CalculatorIcon className="w-6 h-6 text-blue-400" />
              Bet Slip ({selectedTips.length})
            </h2>
            {selectedTips.length > 0 && (
              <button onClick={() => setSelectedTips([])} className="text-gray-400 hover:text-red-400 text-2xl font-bold ml-2">×</button>
            )}
          </div>

          {selectedTips.length === 0 ? (
            <div className="text-center py-12 flex-1 flex flex-col justify-center">
              <CalculatorIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No tips selected</h3>
              <p className="text-gray-500 text-sm">Add tips to build your slip</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-4">
                {selectedTipsData.map(tip => (
                  <div key={tip.id} className="bg-gray-800/70 rounded-lg p-4 border border-gray-700 relative">
                    <button
                      onClick={() => removeFromSlip(tip.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-lg font-bold"
                      title="Remove"
                    >×</button>
                    <div className="font-bold text-white mb-1">{tip.match.homeTeam} vs {tip.match.awayTeam}</div>
                    <div className="flex flex-col gap-1 mb-2">
                      <span className="text-blue-300 text-sm font-semibold">{tip.tip.specific}</span>
                      <span className="text-blue-300 text-sm font-semibold">{tip.tip.type}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-gray-900/80 px-2 py-1 rounded text-xs text-gray-300 font-mono">{tip.tip.odds}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getConfidenceColor(tip.confidence.level)}`}>{tip.confidence.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stake Input and Calculations */}
              <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-1 font-semibold">Stake Amount</label>
                <input
                  type="number"
                  min="1"
                  value={stake}
                  onChange={e => setStake(Number(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white font-semibold focus:outline-none focus:border-blue-400 mb-2"
                />
                <div className="flex flex-col gap-1 text-sm text-gray-300">
                  <div className="flex justify-between"><span>Total Odds:</span> <span className="font-bold text-white">{totalOdds.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Stake:</span> <span className="font-bold text-white">${stake.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Potential Return:</span> <span className="font-bold text-green-400">${potentialReturn.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Risk Level:</span> <span className={`px-2 py-1 rounded text-xs font-semibold ${riskLevelColor}`}>{riskLevel}</span></div>
                </div>
              </div>

              {/* Action Buttons */}
              <button className="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-lg font-bold text-lg mb-2 transition">Generate Booking Codes</button>
              <button className="w-full bg-gray-700 text-gray-400 px-4 py-3 rounded-lg font-bold text-lg mb-4 cursor-not-allowed" disabled>Export Slip</button>
            </>
          )}

          {/* Disclaimer */}
          <div className="mt-auto pt-4">
            <div className="bg-yellow-900/60 border border-yellow-600 rounded-lg p-3 flex items-start gap-3">
              <InformationCircleIcon className="w-6 h-6 text-yellow-400 mt-0.5" />
              <div>
                <span className="font-bold text-yellow-300">Disclaimer</span>
                <p className="text-yellow-200 text-xs mt-1">All tips are for educational purposes only. Bet responsibly and within your means.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Bet Slip Button for mobile */}
        <button
          className="fixed bottom-6 right-6 z-50 lg:hidden bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-bold text-lg"
          onClick={() => setBetSlipOpen(true)}
        >
          <CalculatorIcon className="w-6 h-6" />
          Bet Slip ({selectedTips.length})
        </button>

        {/* Bet Slip Drawer/Modal for mobile */}
        <Dialog open={betSlipOpen} onClose={() => setBetSlipOpen(false)} className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60" aria-hidden="true" onClick={() => setBetSlipOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <Dialog.Panel className="w-[90vw] max-w-sm bg-gray-900/95 p-4 flex flex-col h-full shadow-2xl border-l border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CalculatorIcon className="w-6 h-6 text-blue-400" />
                  Bet Slip ({selectedTips.length})
                </h2>
                <button onClick={() => setBetSlipOpen(false)} className="text-gray-400 hover:text-red-400 text-2xl font-bold ml-2">×</button>
              </div>
              {selectedTips.length === 0 ? (
                <div className="text-center py-12 flex-1 flex flex-col justify-center">
                  <CalculatorIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">No tips selected</h3>
                  <p className="text-gray-500 text-sm">Add tips to build your slip</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-4">
                    {selectedTipsData.map(tip => (
                      <div key={tip.id} className="bg-gray-800/70 rounded-lg p-4 border border-gray-700 relative">
                        <button
                          onClick={() => removeFromSlip(tip.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-lg font-bold"
                          title="Remove"
                        >×</button>
                        <div className="font-bold text-white mb-1">{tip.match.homeTeam} vs {tip.match.awayTeam}</div>
                        <div className="flex flex-col gap-1 mb-2">
                          <span className="text-blue-300 text-sm font-semibold">{tip.tip.specific}</span>
                          <span className="text-blue-300 text-sm font-semibold">{tip.tip.type}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-gray-900/80 px-2 py-1 rounded text-xs text-gray-300 font-mono">{tip.tip.odds}</span>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getConfidenceColor(tip.confidence.level)}`}>{tip.confidence.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stake Input and Calculations */}
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm mb-1 font-semibold">Stake Amount</label>
                    <input
                      type="number"
                      min="1"
                      value={stake}
                      onChange={e => setStake(Number(e.target.value))}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white font-semibold focus:outline-none focus:border-blue-400 mb-2"
                    />
                    <div className="flex flex-col gap-1 text-sm text-gray-300">
                      <div className="flex justify-between"><span>Total Odds:</span> <span className="font-bold text-white">{totalOdds.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span>Stake:</span> <span className="font-bold text-white">${stake.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span>Potential Return:</span> <span className="font-bold text-green-400">${potentialReturn.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span>Risk Level:</span> <span className={`px-2 py-1 rounded text-xs font-semibold ${riskLevelColor}`}>{riskLevel}</span></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <button className="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-lg font-bold text-lg mb-2 transition">Generate Booking Codes</button>
                  <button className="w-full bg-gray-700 text-gray-400 px-4 py-3 rounded-lg font-bold text-lg mb-4 cursor-not-allowed" disabled>Export Slip</button>
                </>
              )}

              {/* Disclaimer */}
              <div className="mt-auto pt-4">
                <div className="bg-yellow-900/60 border border-yellow-600 rounded-lg p-3 flex items-start gap-3">
                  <InformationCircleIcon className="w-6 h-6 text-yellow-400 mt-0.5" />
                  <div>
                    <span className="font-bold text-yellow-300">Disclaimer</span>
                    <p className="text-yellow-200 text-xs mt-1">All tips are for educational purposes only. Bet responsibly and within your means.</p>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
} 