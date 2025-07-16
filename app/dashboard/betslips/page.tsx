'use client';

import React, { useState } from 'react';
import { DocumentDuplicateIcon, PlusIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const mockTips = [
  { id: '1', name: 'England vs Netherlands - Over 1.5 Goals', odds: 2.15 },
  { id: '2', name: 'Real Madrid vs Juventus - Under 2.5 Goals', odds: 1.85 },
  { id: '3', name: 'Germany vs Poland - Alexandra Popp to Score', odds: 3.20 },
  { id: '4', name: 'Fluminense vs Chelsea - Over 0.5 1st Half', odds: 1.95 },
];

const mockHistory = [
  { id: 'A1', date: '2024-07-01', tips: ['England vs Netherlands', 'Real Madrid vs Juventus'], stake: 5, odds: 3.98, result: 'win', return: 19.90 },
  { id: 'A2', date: '2024-07-02', tips: ['Germany vs Poland'], stake: 10, odds: 3.20, result: 'loss', return: 0 },
  { id: 'A3', date: '2024-07-03', tips: ['Fluminense vs Chelsea', 'England vs Netherlands'], stake: 7, odds: 4.19, result: 'pending', return: null },
];

export default function BetSlipsPage() {
  const [tab, setTab] = useState<'build' | 'history'>('build');
  const [selectedTips, setSelectedTips] = useState<string[]>([]);
  const [stake, setStake] = useState(5);
  const [history, setHistory] = useState(mockHistory);

  // Calculate total odds and potential return
  const selectedTipsData = mockTips.filter(tip => selectedTips.includes(tip.id));
  const totalOdds = selectedTipsData.reduce((acc, tip) => acc * tip.odds, 1) || 0;
  const potentialReturn = stake * totalOdds;

  // Analytics
  const totalStaked = history.reduce((acc, slip) => acc + slip.stake, 0);
  const totalWon = history.reduce((acc, slip) => acc + (slip.result === 'win' ? slip.return || 0 : 0), 0);
  const winCount = history.filter(slip => slip.result === 'win').length;
  const lossCount = history.filter(slip => slip.result === 'loss').length;
  const pendingCount = history.filter(slip => slip.result === 'pending').length;
  const winRate = history.length ? Math.round((winCount / history.length) * 100) : 0;

  // Save slip
  const saveSlip = () => {
    if (selectedTips.length === 0 || stake <= 0) return;
    setHistory([
      {
        id: Math.random().toString(36).slice(2, 8).toUpperCase(),
        date: new Date().toISOString().slice(0, 10),
        tips: selectedTipsData.map(t => t.name.split(' - ')[0]),
        stake,
        odds: totalOdds,
        result: 'pending',
        return: null,
      },
      ...history,
    ]);
    setSelectedTips([]);
    setStake(5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <DocumentDuplicateIcon className="w-10 h-10 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Ticket Builder</h1>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button onClick={() => setTab('build')} className={`px-6 py-2 rounded-t-lg font-bold transition ${tab === 'build' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'}`}>Build Ticket</button>
          <button onClick={() => setTab('history')} className={`px-6 py-2 rounded-t-lg font-bold transition ${tab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'}`}>History / Analytics</button>
        </div>
        {/* Build Ticket Tab */}
        {tab === 'build' && (
          <div className="bg-gray-900/70 border border-gray-700 rounded-b-xl p-6 flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Select Tips</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockTips.map(tip => (
                  <label key={tip.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${selectedTips.includes(tip.id) ? 'bg-blue-800/60 border-blue-400' : 'bg-gray-800/60 border-gray-700 hover:border-blue-400'}`}>
                    <input
                      type="checkbox"
                      checked={selectedTips.includes(tip.id)}
                      onChange={() => setSelectedTips(tips => tips.includes(tip.id) ? tips.filter(id => id !== tip.id) : [...tips, tip.id])}
                      className="accent-blue-500"
                    />
                    <span className="text-white font-semibold">{tip.name}</span>
                    <span className="ml-auto text-blue-300 font-mono font-bold">{tip.odds}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1">
                <label className="block text-gray-300 text-sm mb-1 font-semibold">Stake Amount</label>
                <input
                  type="number"
                  min={1}
                  value={stake}
                  onChange={e => setStake(Number(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white font-semibold focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 text-sm text-gray-300">
                <div className="flex justify-between"><span>Total Odds:</span> <span className="font-bold text-white">{totalOdds.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Potential Return:</span> <span className="font-bold text-green-400">${potentialReturn.toFixed(2)}</span></div>
              </div>
            </div>
            <button onClick={saveSlip} className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2 transition self-end disabled:opacity-50" disabled={selectedTips.length === 0 || stake <= 0}>
              <PlusIcon className="w-5 h-5" /> Save Ticket
            </button>
          </div>
        )}
        {/* History/Analytics Tab */}
        {tab === 'history' && (
          <div className="bg-gray-900/70 border border-gray-700 rounded-b-xl p-6 flex flex-col gap-6">
            {/* Analytics summary */}
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="bg-blue-800/60 rounded-lg p-4 flex flex-col items-center min-w-[120px]">
                <span className="text-2xl font-bold text-white">{winRate}%</span>
                <span className="text-xs text-blue-200">Win Rate</span>
              </div>
              <div className="bg-green-800/60 rounded-lg p-4 flex flex-col items-center min-w-[120px]">
                <span className="text-2xl font-bold text-green-300">${totalWon.toFixed(2)}</span>
                <span className="text-xs text-green-200">Total Won</span>
              </div>
              <div className="bg-yellow-800/60 rounded-lg p-4 flex flex-col items-center min-w-[120px]">
                <span className="text-2xl font-bold text-yellow-300">{pendingCount}</span>
                <span className="text-xs text-yellow-200">Pending</span>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-4 flex flex-col items-center min-w-[120px]">
                <span className="text-2xl font-bold text-gray-200">${totalStaked.toFixed(2)}</span>
                <span className="text-xs text-gray-300">Total Staked</span>
              </div>
            </div>
            {/* History table */}
            <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900/50 backdrop-blur-sm">
              <table className="min-w-full divide-y divide-gray-700 text-sm">
                <thead className="bg-gray-900/70">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Tips</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Stake</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Odds</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Result</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider">Return</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {history.map(slip => (
                    <tr key={slip.id} className="hover:bg-gray-800/40 transition">
                      <td className="px-4 py-3 text-gray-200">{slip.date}</td>
                      <td className="px-4 py-3 text-blue-200">{slip.tips.join(', ')}</td>
                      <td className="px-4 py-3 text-white font-semibold">${slip.stake.toFixed(2)}</td>
                      <td className="px-4 py-3 text-blue-300 font-bold">{slip.odds.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        {slip.result === 'win' && <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-600 text-white"><CheckCircleIcon className="w-4 h-4" />Win</span>}
                        {slip.result === 'loss' && <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white"><XCircleIcon className="w-4 h-4" />Loss</span>}
                        {slip.result === 'pending' && <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-yellow-600 text-white"><ClockIcon className="w-4 h-4" />Pending</span>}
                      </td>
                      <td className="px-4 py-3 font-bold {slip.result === 'win' ? 'text-green-400' : slip.result === 'loss' ? 'text-red-400' : 'text-yellow-300'}">
                        {slip.return !== null ? `$${slip.return.toFixed(2)}` : '--'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 