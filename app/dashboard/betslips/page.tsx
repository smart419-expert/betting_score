'use client';

import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  DocumentDuplicateIcon, 
  ArrowPathIcon, 
  ArrowDownTrayIcon, 
  CheckIcon, 
  TrashIcon,
  XMarkIcon,
  StarIcon,
  CurrencyDollarIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';
import { Navbar } from '../components/navbar';

// Mock data for dropdowns
const sports = ["Football", "Tennis", "Basketball", "Cricket", "Rugby"];
const leagues = {
  Football: ["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1"],
  Tennis: ["Wimbledon", "US Open", "Australian Open", "French Open"],
  Basketball: ["NBA", "EuroLeague", "CBA"],
  Cricket: ["IPL", "Test Series", "T20 World Cup"],
  Rugby: ["Six Nations", "Rugby Championship", "World Cup"]
};
const matches = {
  "Premier League": [
    "Manchester United vs Liverpool",
    "Arsenal vs Chelsea", 
    "Manchester City vs Tottenham",
    "Newcastle vs Aston Villa"
  ],
  "La Liga": [
    "Real Madrid vs Barcelona",
    "Atletico Madrid vs Sevilla",
    "Valencia vs Athletic Bilbao"
  ],
  "Serie A": [
    "Juventus vs AC Milan",
    "Inter Milan vs Napoli",
    "Roma vs Lazio"
  ]
};
const tips = {
  "Manchester United vs Liverpool": [
    "Over 2.5 Goals (1.85)",
    "Both Teams to Score (1.65)",
    "Liverpool Win (2.10)",
    "Over 1.5 First Half Goals (2.25)"
  ],
  "Real Madrid vs Barcelona": [
    "Real Madrid Win (1.95)",
    "Over 2.5 Goals (1.75)",
    "Both Teams to Score (1.55)",
    "Real Madrid -1 (3.20)"
  ],
  "Arsenal vs Chelsea": [
    "Arsenal Win (1.80)",
    "Under 2.5 Goals (2.15)",
    "Arsenal Clean Sheet (2.45)",
    "Arsenal to Score First (1.65)"
  ]
};

interface Ticket {
  id: string;
  name: string;
  selections: Selection[];
  stake: number;
  potentialPayout: number;
  status: 'draft' | 'saved' | 'placed';
  createdAt: Date;
}

interface Selection {
  id: string;
  sport: string;
  league: string;
  match: string;
  tip: string;
  odds: number;
  confidence: number;
}

export default function TicketBuilderPage() {
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedMatch, setSelectedMatch] = useState('');
  const [selectedTip, setSelectedTip] = useState('');
  const [stake, setStake] = useState(10);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [savedTickets, setSavedTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState('builder');
  const [ticketName, setTicketName] = useState('');

  // Calculate potential payout
  const totalOdds = selections.reduce((acc, selection) => acc * selection.odds, 1);
  const potentialPayout = stake * totalOdds;

  const addSelection = () => {
    if (!selectedSport || !selectedLeague || !selectedMatch || !selectedTip) {
      alert('Please select all fields');
      return;
    }

    const oddsMatch = selectedTip.match(/\(([\d.]+)\)/);
    const odds = oddsMatch ? parseFloat(oddsMatch[1]) : 1.5;
    const confidence = Math.floor(Math.random() * 30) + 70; // Random confidence 70-100

    const newSelection: Selection = {
      id: Date.now().toString(),
        sport: selectedSport,
        league: selectedLeague,
        match: selectedMatch,
      tip: selectedTip.split(' (')[0],
      odds,
      confidence
    };

    setSelections([...selections, newSelection]);
    
    // Reset form
    setSelectedSport('');
    setSelectedLeague('');
    setSelectedMatch('');
    setSelectedTip('');
  };

  const removeSelection = (id: string) => {
    setSelections(selections.filter(s => s.id !== id));
  };

  const saveTicket = () => {
    if (selections.length === 0) {
      alert('Please add at least one selection');
      return;
    }

    const newTicket: Ticket = {
      id: Date.now().toString(),
      name: ticketName || `Ticket ${savedTickets.length + 1}`,
      selections: [...selections],
        stake,
      potentialPayout,
      status: 'saved',
      createdAt: new Date()
    };

    setSavedTickets([...savedTickets, newTicket]);
    setSelections([]);
    setStake(10);
    setTicketName('');
  };

  const deleteTicket = (id: string) => {
    setSavedTickets(savedTickets.filter(t => t.id !== id));
  };

  const generateBetCode = () => {
    // Mock bet code generation
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigator.clipboard.writeText(code);
    alert(`Bet code ${code} copied to clipboard!`);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#101522] via-[#181d2a] to-[#1a2236] text-white overflow-hidden">
      <Navbar name="Ticket Builder" />
      
      <div className="flex-1 px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Ticket Builder</h1>
          <p className="text-gray-300">Create custom betting tickets with multiple selections</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <span className="ml-2 text-blue-400 font-medium">Add Selections</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-600"></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${selections.length > 0 ? 'bg-green-600' : 'bg-gray-600'}`}>
                {selections.length > 0 ? <CheckIcon className="w-5 h-5" /> : '2'}
              </div>
              <span className={`ml-2 font-medium ${selections.length > 0 ? 'text-green-400' : 'text-gray-400'}`}>Set Stake</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-600"></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${selections.length > 0 && stake > 0 ? 'bg-green-600' : 'bg-gray-600'}`}>
                {selections.length > 0 && stake > 0 ? <CheckIcon className="w-5 h-5" /> : '3'}
              </div>
              <span className={`ml-2 font-medium ${selections.length > 0 && stake > 0 ? 'text-green-400' : 'text-gray-400'}`}>Save Ticket</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('builder')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              activeTab === 'builder' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              activeTab === 'saved' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Saved Tickets ({savedTickets.length})
          </button>
        </div>

        {activeTab === 'builder' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Selection Builder */}
            <div className="lg:col-span-2 space-y-6">
              {/* Selection Form */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4 text-white">Add Selection</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Sport</label>
              <select
                value={selectedSport}
                      onChange={(e) => {
                  setSelectedSport(e.target.value);
                        setSelectedLeague('');
                        setSelectedMatch('');
                        setSelectedTip('');
                      }}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Sport</option>
                {sports.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>

            <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">League</label>
              <select
                value={selectedLeague}
                      onChange={(e) => {
                  setSelectedLeague(e.target.value);
                        setSelectedMatch('');
                        setSelectedTip('');
                }}
                disabled={!selectedSport}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              >
                <option value="">Select League</option>
                      {selectedSport && leagues[selectedSport as keyof typeof leagues]?.map(league => (
                  <option key={league} value={league}>{league}</option>
                ))}
              </select>
            </div>

            <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Match</label>
              <select
                value={selectedMatch}
                      onChange={(e) => {
                  setSelectedMatch(e.target.value);
                        setSelectedTip('');
                }}
                disabled={!selectedLeague}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              >
                <option value="">Select Match</option>
                      {selectedLeague && matches[selectedLeague as keyof typeof matches]?.map(match => (
                  <option key={match} value={match}>{match}</option>
                ))}
              </select>
            </div>

            <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tip</label>
              <select
                      value={selectedTip}
                      onChange={(e) => setSelectedTip(e.target.value)}
                disabled={!selectedMatch}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              >
                <option value="">Select Tip</option>
                      {selectedMatch && tips[selectedMatch as keyof typeof tips]?.map(tip => (
                        <option key={tip} value={tip}>{tip}</option>
                ))}
              </select>
            </div>
          </div>

                <button
                  onClick={addSelection}
                  disabled={!selectedSport || !selectedLeague || !selectedMatch || !selectedTip}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Selection
                </button>
              </div>

              {/* Current Selections */}
              {selections.length > 0 && (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-white">Current Selections ({selections.length})</h3>
                  
                  <div className="space-y-3">
                    {selections.map((selection, index) => (
                      <div key={selection.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                              {index + 1}
                            </span>
                            <span className="text-sm text-gray-300">{selection.sport} • {selection.league}</span>
                          </div>
                          <button
                            onClick={() => removeSelection(selection.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="text-white font-medium mb-1">{selection.match}</div>
                        <div className="text-blue-400 font-medium mb-2">{selection.tip}</div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-300">
                              Odds: <span className="text-green-400 font-bold">{selection.odds}</span>
                            </span>
                            <span className="text-sm text-gray-300">
                              Confidence: <span className="text-yellow-400 font-bold">{selection.confidence}%</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-yellow-400 font-medium">Live</span>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          )}
            </div>

            {/* Right Column - Summary & Actions */}
            <div className="space-y-6">
              {/* Live Summary */}
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-6 border border-blue-700">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <CalculatorIcon className="w-6 h-6" />
                  Live Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Selections:</span>
                    <span className="text-white font-bold">{selections.length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Odds:</span>
                    <span className="text-green-400 font-bold text-lg">
                      {totalOdds.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="border-t border-blue-700 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Stake:</span>
                      <div className="flex items-center gap-2">
                        <CurrencyDollarIcon className="w-4 h-4 text-gray-300" />
              <input
                type="number"
                value={stake}
                          onChange={(e) => setStake(Number(e.target.value))}
                          className="bg-transparent text-white font-bold text-right w-20 border-none focus:ring-0"
                          min="1"
              />
            </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Potential Payout:</span>
                      <span className="text-green-400 font-bold text-xl">
                        ${potentialPayout.toFixed(2)}
                      </span>
                    </div>
                  </div>
            </div>
          </div>

              {/* Action Buttons */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-white">Actions</h3>
                
                <div className="space-y-3">
            <button
                    onClick={saveTicket}
                    disabled={selections.length === 0}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CheckIcon className="w-5 h-5" />
                    Save Ticket
            </button>
                  
            <button
                    onClick={generateBetCode}
                    disabled={selections.length === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <DocumentDuplicateIcon className="w-5 h-5" />
                    Generate Bet Code
            </button>
                  
            <button
                    onClick={() => {
                      setSelections([]);
                      setStake(10);
                    }}
                    disabled={selections.length === 0}
                    className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                    Clear All
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-white">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    Export Ticket
            </button>
                  
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2">
                    <DocumentDuplicateIcon className="w-4 h-4" />
                    Convert Code
            </button>
          </div>
              </div>
            </div>
          </div>
        ) : (
          /* Saved Tickets Tab */
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-6 text-white">Saved Tickets</h3>
            
            {savedTickets.length === 0 ? (
              <div className="text-center py-12">
                <DocumentDuplicateIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-300 mb-2">No saved tickets</h4>
                <p className="text-gray-500">Create your first ticket using the builder</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedTickets.map((ticket) => (
                  <div key={ticket.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-bold">{ticket.name}</h4>
                        <p className="text-sm text-gray-400">
                          Created {ticket.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                          {ticket.status}
                        </span>
                        <button
                          onClick={() => deleteTicket(ticket.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <span className="text-sm text-gray-400">Selections:</span>
                        <div className="text-white font-bold">{ticket.selections.length}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400">Stake:</span>
                        <div className="text-white font-bold">${ticket.stake}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400">Odds:</span>
                        <div className="text-green-400 font-bold">
                          {(ticket.potentialPayout / ticket.stake).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400">Payout:</span>
                        <div className="text-green-400 font-bold">${ticket.potentialPayout.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-sm transition-all">
                        Edit
                      </button>
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded text-sm transition-all">
                        Place Bet
                      </button>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded text-sm transition-all">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                      </button>
                    </div>
        </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 