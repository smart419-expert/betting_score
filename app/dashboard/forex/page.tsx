'use client';

import React, { useState, useEffect } from 'react';
import { ChartBarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, ClipboardIcon, CalculatorIcon, ChatBubbleLeftRightIcon, TableCellsIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';
import { Navbar } from '../components/navbar';
import { Sparklines, SparklinesLine, SparklinesBars } from 'react-sparklines';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, LineChart, Line } from 'recharts';

// Add Signal type
interface Signal {
  id: string;
  pair: string;
  direction: 'Buy' | 'Sell';
  entry: number;
  stopLoss: number;
  takeProfit: number;
  confidence: number;
  time: string;
  chart: number[];
}

const initialSignals: Signal[] = [
  {
    id: '1',
    pair: 'EUR/USD',
    direction: 'Buy',
    entry: 1.0850,
    stopLoss: 1.0800,
    takeProfit: 1.0950,
    confidence: 92,
    time: '2m ago',
    chart: [1.081, 1.083, 1.085, 1.084, 1.087, 1.085],
  },
  {
    id: '2',
    pair: 'GBP/JPY',
    direction: 'Sell',
    entry: 183.50,
    stopLoss: 184.20,
    takeProfit: 182.20,
    confidence: 78,
    time: '5m ago',
    chart: [183.7, 183.6, 183.5, 183.4, 183.2, 183.5],
  },
  {
    id: '3',
    pair: 'XAU/USD',
    direction: 'Buy',
    entry: 2320.0,
    stopLoss: 2305.0,
    takeProfit: 2350.0,
    confidence: 85,
    time: '10m ago',
    chart: [2310, 2315, 2320, 2325, 2330, 2320],
  },
  {
    id: '4',
    pair: 'USD/CHF',
    direction: 'Sell',
    entry: 0.9000,
    stopLoss: 0.9050,
    takeProfit: 0.8900,
    confidence: 65,
    time: '15m ago',
    chart: [0.902, 0.901, 0.900, 0.899, 0.898, 0.900],
  },
];

export default function ForexPreviewPage() {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table');
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [signals, setSignals] = useState<Signal[]>(initialSignals);
  const [search, setSearch] = useState('');
  const [directionFilter, setDirectionFilter] = useState<'All' | 'Buy' | 'Sell'>('All');
  const [confidenceRange, setConfidenceRange] = useState<[number, number]>([0, 100]);

  // Risk calculator state
  const [accountSize, setAccountSize] = useState(1000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [customStopLoss, setCustomStopLoss] = useState('');

  // Live updates: randomly add/update a signal every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      setSignals(prev => {
        const idx = Math.floor(Math.random() * prev.length);
        const updated = [...prev];
        // Randomly update confidence and time
        updated[idx] = {
          ...updated[idx],
          confidence: Math.max(50, Math.min(99, updated[idx].confidence + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5))),
          time: 'Just now',
        };
        return updated;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Filtered signals
  const filteredSignals = signals.filter((signal: Signal) => {
    const matchesSearch =
      signal.pair.toLowerCase().includes(search.toLowerCase()) ||
      signal.direction.toLowerCase().includes(search.toLowerCase());
    const matchesDirection = directionFilter === 'All' || signal.direction === directionFilter;
    const matchesConfidence = signal.confidence >= confidenceRange[0] && signal.confidence <= confidenceRange[1];
    return matchesSearch && matchesDirection && matchesConfidence;
  });

  const openCalculator = (signal: Signal) => {
    setSelectedSignal(signal);
    setShowCalculator(true);
  };

  const closeCalculator = () => {
    setShowCalculator(false);
    setSelectedSignal(null);
  };

  // For summary chart, mock some confidence history
  const summaryData = [80, 85, 90, 88, 92, 87, 91, 89, 93, 90];

  // Calculator logic
  let calcStopLoss = 0;
  let entry = 0;
  let takeProfit = 0;
  if (selectedSignal) {
    entry = selectedSignal.entry;
    takeProfit = selectedSignal.takeProfit;
    calcStopLoss = customStopLoss ? parseFloat(customStopLoss) : Math.abs(selectedSignal.entry - selectedSignal.stopLoss);
  }
  const riskAmount = accountSize * (riskPercent / 100);
  const positionSize = calcStopLoss > 0 ? riskAmount / calcStopLoss : 0;
  const reward = Math.abs(takeProfit - entry) * positionSize;
  const riskReward = riskAmount > 0 ? reward / riskAmount : 0;
  const barData = [riskAmount, reward];
  const barChartData = [
    { name: 'Risk', value: riskAmount },
    { name: 'Reward', value: reward },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-900">
      <Navbar name="Forex Preview" />
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Forex Signals & Previews</h1>
            <p className="text-gray-300">Live AI-powered forex signals with risk calculator and performance charts.</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by pair or direction..."
              className="w-full bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 shadow"
            />
          </div>
          <select
            value={directionFilter}
            onChange={e => setDirectionFilter(e.target.value as 'All' | 'Buy' | 'Sell')}
            className="bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
          >
            <option value="All">All Directions</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
          <div className="flex items-center gap-2">
            <span className="text-gray-300 text-xs">Confidence:</span>
            <input
              type="range"
              min={0}
              max={100}
              value={confidenceRange[0]}
              onChange={e => setConfidenceRange([Number(e.target.value), confidenceRange[1]])}
              className="accent-blue-500"
            />
            <input
              type="range"
              min={0}
              max={100}
              value={confidenceRange[1]}
              onChange={e => setConfidenceRange([confidenceRange[0], Number(e.target.value)])}
              className="accent-blue-500"
            />
            <span className="text-gray-300 text-xs">{confidenceRange[0]}% - {confidenceRange[1]}%</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('table')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}><TableCellsIcon className="w-5 h-5" />Table View</button>
            <button onClick={() => setViewMode('card')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${viewMode === 'card' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}><ViewColumnsIcon className="w-5 h-5" />Card View</button>
          </div>
        </div>

        {/* Summary chart with axes and numbers */}
        <div className="mb-8 bg-gray-900/60 border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-2">
            <ChartBarIcon className="w-8 h-8 text-blue-400" />
            <span className="text-gray-200 font-bold text-lg">Avg. Confidence (last 10 signals)</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={summaryData.map((v, i) => ({ idx: i + 1, value: v }))} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="idx" tick={{ fill: '#cbd5e1', fontSize: 12 }} axisLine={{ stroke: '#374151' }} label={{ value: 'Signal', position: 'insideBottom', fill: '#cbd5e1', fontSize: 12 }} />
              <YAxis domain={[60, 100]} tick={{ fill: '#cbd5e1', fontSize: 12 }} axisLine={{ stroke: '#374151' }} tickFormatter={(v: number) => `${v}%`} />
              <Tooltip formatter={(v: number) => `${v}%`} labelStyle={{ color: '#fff' }} contentStyle={{ background: '#1e293b', border: 'none' }} />
              <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={4} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <span className="text-blue-300 mt-2">{Math.round(summaryData.reduce((a, b) => a + b, 0) / summaryData.length)}%</span>
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900/50 backdrop-blur-sm">
            <table className="min-w-full divide-y divide-gray-700 text-sm">
              <thead className="bg-gray-900/70">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Pair</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Direction</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Entry</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">SL</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">TP</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Confidence</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Chart</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredSignals.map((signal: Signal) => (
                  <tr key={signal.id} className="hover:bg-gray-800/40 transition">
                    <td className="px-4 py-3 text-white font-semibold">{signal.pair}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${signal.direction === 'Buy' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{signal.direction === 'Buy' ? <ArrowTrendingUpIcon className="w-4 h-4 inline" /> : <ArrowTrendingDownIcon className="w-4 h-4 inline" />}{signal.direction}</span>
                    </td>
                    <td className="px-4 py-3 text-blue-300 font-mono">{signal.entry}</td>
                    <td className="px-4 py-3 text-red-300 font-mono">{signal.stopLoss}</td>
                    <td className="px-4 py-3 text-green-300 font-mono">{signal.takeProfit}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${signal.confidence >= 85 ? 'bg-green-700 text-green-200' : signal.confidence >= 70 ? 'bg-yellow-700 text-yellow-200' : 'bg-red-700 text-red-200'}`}>{signal.confidence}%</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{signal.time}</td>
                    <td className="px-4 py-3"><Sparklines data={signal.chart} width={60} height={20}><SparklinesLine color="#60a5fa" style={{ fill: 'none' }} /></Sparklines></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => {navigator.clipboard.writeText(`${signal.pair} ${signal.direction} Entry: ${signal.entry} SL: ${signal.stopLoss} TP: ${signal.takeProfit}`)}} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg font-semibold flex items-center gap-1 text-xs transition"><ClipboardIcon className="w-4 h-4" />Copy</button>
                        <button className="border border-gray-600 text-gray-300 rounded-lg font-semibold flex items-center gap-1 px-3 py-1 hover:bg-gray-800 text-xs transition"><ChatBubbleLeftRightIcon className="w-4 h-4" />Discuss</button>
                        <button onClick={() => openCalculator(signal)} className="bg-gray-700 text-white px-3 py-1 rounded-lg font-semibold flex items-center gap-1 text-xs transition"><CalculatorIcon className="w-4 h-4" />Calc</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Card View */}
        {viewMode === 'card' && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredSignals.map((signal: Signal) => (
              <div key={signal.id} className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-white">{signal.pair}</span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${signal.direction === 'Buy' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{signal.direction === 'Buy' ? <ArrowTrendingUpIcon className="w-4 h-4 inline" /> : <ArrowTrendingDownIcon className="w-4 h-4 inline" />}{signal.direction}</span>
                </div>
                <div className="flex gap-4 text-sm font-mono">
                  <div>Entry: <span className="text-blue-300">{signal.entry}</span></div>
                  <div>SL: <span className="text-red-300">{signal.stopLoss}</span></div>
                  <div>TP: <span className="text-green-300">{signal.takeProfit}</span></div>
                </div>
                <div className="my-2">
                  <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={signal.chart.map((v, i) => ({ idx: i + 1, value: v }))} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="idx" hide axisLine={false} tick={false} />
                      <YAxis domain={['auto', 'auto']} width={30} tick={{ fill: '#cbd5e1', fontSize: 10 }} axisLine={{ stroke: '#374151' }} tickFormatter={(v: number) => v.toFixed(2)} />
                      <Tooltip formatter={(v: number) => v.toFixed(4)} labelStyle={{ color: '#fff' }} contentStyle={{ background: '#1e293b', border: 'none' }} />
                      <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${signal.confidence >= 85 ? 'bg-green-700 text-green-200' : signal.confidence >= 70 ? 'bg-yellow-700 text-yellow-200' : 'bg-red-700 text-red-200'}`}>{signal.confidence}%</span>
                  <span className="text-gray-400 text-xs">{signal.time}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => {navigator.clipboard.writeText(`${signal.pair} ${signal.direction} Entry: ${signal.entry} SL: ${signal.stopLoss} TP: ${signal.takeProfit}`)}} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg font-semibold flex items-center gap-1 text-xs transition"><ClipboardIcon className="w-4 h-4" />Copy</button>
                  <button className="border border-gray-600 text-gray-300 rounded-lg font-semibold flex items-center gap-1 px-3 py-1 hover:bg-gray-800 text-xs transition"><ChatBubbleLeftRightIcon className="w-4 h-4" />Discuss</button>
                  <button onClick={() => openCalculator(signal)} className="bg-gray-700 text-white px-3 py-1 rounded-lg font-semibold flex items-center gap-1 text-xs transition"><CalculatorIcon className="w-4 h-4" />Calc</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Risk Calculator Drawer/Modal */}
      <Dialog open={showCalculator} onClose={closeCalculator} className="relative z-50">
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" onClick={closeCalculator} />
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <Dialog.Panel className="w-[90vw] max-w-md bg-gray-900/95 p-6 flex flex-col h-full shadow-2xl border-l border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CalculatorIcon className="w-6 h-6 text-blue-400" />
                Risk Calculator
              </h2>
              <button onClick={closeCalculator} className="text-gray-400 hover:text-red-400 text-2xl font-bold ml-2">×</button>
            </div>
            {selectedSignal ? (
              <>
                <div className="mb-4">
                  <div className="text-white font-bold text-lg mb-1">{selectedSignal.pair} <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${selectedSignal.direction === 'Buy' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{selectedSignal.direction}</span></div>
                  <div className="text-gray-300 text-sm mb-2">Entry: <span className="text-blue-300 font-mono">{selectedSignal.entry}</span> | SL: <span className="text-red-300 font-mono">{selectedSignal.stopLoss}</span> | TP: <span className="text-green-300 font-mono">{selectedSignal.takeProfit}</span></div>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Account Size ($)</label>
                    <input type="number" min={1} value={accountSize} onChange={e => setAccountSize(Number(e.target.value))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white font-semibold focus:outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Risk %</label>
                    <input type="number" min={0.1} max={100} step={0.1} value={riskPercent} onChange={e => setRiskPercent(Number(e.target.value))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white font-semibold focus:outline-none focus:border-blue-400" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-400 text-xs mb-1">Stop Loss (pips or price diff)</label>
                    <input type="number" min={0.0001} step={0.0001} value={customStopLoss} onChange={e => setCustomStopLoss(e.target.value)} placeholder={Math.abs(selectedSignal.entry - selectedSignal.stopLoss).toString()} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white font-semibold focus:outline-none focus:border-blue-400" />
                  </div>
                </div>
                <div className="mb-4 bg-gray-800/60 border border-gray-700 rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-gray-300"><span>Risk Amount:</span> <span className="font-bold text-red-400">${riskAmount.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm text-gray-300"><span>Position Size:</span> <span className="font-bold text-blue-300">{positionSize > 0 ? positionSize.toFixed(4) : '--'}</span></div>
                  <div className="flex justify-between text-sm text-gray-300"><span>Potential Reward:</span> <span className="font-bold text-green-400">${reward.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm text-gray-300"><span>Risk/Reward Ratio:</span> <span className="font-bold text-yellow-300">{riskReward > 0 ? riskReward.toFixed(2) : '--'}</span></div>
                </div>
                <div className="mb-4">
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={barChartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12 }} axisLine={{ stroke: '#374151' }} />
                      <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} axisLine={{ stroke: '#374151' }} tickFormatter={(v: number) => `$${v}`} />
                      <Tooltip formatter={(v: number) => `$${Number(v).toFixed(2)}`} labelStyle={{ color: '#fff' }} contentStyle={{ background: '#1e293b', border: 'none' }} />
                      <Bar dataKey="value" fill="#f87171">
                        <LabelList dataKey="value" position="top" formatter={(v: number) => `$${Number(v).toFixed(2)}`} fill="#fff" fontSize={12} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center text-gray-400">
                <CalculatorIcon className="w-16 h-16 mb-4" />
                <span>Risk calculator coming soon...</span>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
