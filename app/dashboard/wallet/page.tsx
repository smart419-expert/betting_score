'use client'

import React, { useState } from 'react';
import { BanknotesIcon, CreditCardIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, ClockIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '../components/navbar';

const tabs = [
  { name: 'History', icon: ClockIcon },
  { name: 'Deposit', icon: ArrowDownTrayIcon },
  { name: 'Withdraw', icon: ArrowUpTrayIcon },
];

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositError, setDepositError] = useState('');
  const [withdrawError, setWithdrawError] = useState('');
  const balance = 0;
  const role = 'Influencer';
  const transactions = [];

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositAmount || isNaN(Number(depositAmount)) || Number(depositAmount) <= 0) {
      setDepositError('Enter a valid amount');
      return;
    }
    setDepositError('');
    // TODO: Integrate deposit logic
    alert(`Deposited R${depositAmount}`);
    setDepositAmount('');
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount || isNaN(Number(withdrawAmount)) || Number(withdrawAmount) <= 0) {
      setWithdrawError('Enter a valid amount');
      return;
    }
    setWithdrawError('');
    // TODO: Integrate withdraw logic
    alert(`Withdrew R${withdrawAmount}`);
    setWithdrawAmount('');
  };

  return (
    <div className='jsx-38920fb5c616e4c5 relative min-h-screen flex flex-col bg-gradient-to-br from-[#101522] via-[#181d2a] to-[#1a2236] text-white overflow-hidden'>
      <Navbar name="Wallet" />
      <div className="min-h-screen bg-gradient-to-br from-[#101522] via-[#181d2a] to-[#1a2236] px-4 py-8">
        {/* Wallet Overview */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BanknotesIcon className="w-7 h-7 text-green-400" />
              <span className="text-xl font-bold text-green-300">Wallet Overview</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Role</span>
              <span className="font-semibold text-base text-green-300">{role}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-2">
            <div>
              <span className="text-gray-400 text-sm">Current Balance</span>
              <div className="text-4xl font-extrabold text-white mt-1">R{balance}</div>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow transition">Deposit</button>
              <button className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition">Withdraw</button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
            {tabs.map((tab, i) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(i)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-lg font-semibold transition-all ${activeTab === i ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'}`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content with Animation */}
        <div className="max-w-4xl mx-auto mb-8 min-h-[260px]">
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow"
              >
                <h2 className="text-xl font-bold text-white mb-4">Transaction History</h2>
                {transactions.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">No transactions yet.</div>
                ) : (
                  <ul>{/* Map transactions here */}</ul>
                )}
              </motion.div>
            )}
            {activeTab === 1 && (
              <motion.div
                key="deposit"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow text-white text-center"
              >
                <h2 className="text-xl font-bold mb-4">Deposit Funds</h2>
                <form className="max-w-xs mx-auto" onSubmit={handleDeposit}>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    placeholder="Amount (R)"
                    value={depositAmount}
                    onChange={e => setDepositAmount(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  />
                  {depositError && <div className="text-red-400 text-xs mb-2">{depositError}</div>}
                  <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow transition">Deposit</button>
                </form>
                <CreditCardIcon className="w-12 h-12 mx-auto text-green-400 mt-6" />
              </motion.div>
            )}
            {activeTab === 2 && (
              <motion.div
                key="withdraw"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow text-white text-center"
              >
                <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
                <form className="max-w-xs mx-auto" onSubmit={handleWithdraw}>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    placeholder="Amount (R)"
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                  {withdrawError && <div className="text-red-400 text-xs mb-2">{withdrawError}</div>}
                  <button type="submit" className="w-full bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition">Withdraw</button>
                </form>
                <CreditCardIcon className="w-12 h-12 mx-auto text-blue-400 mt-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-400 text-center mt-12 mb-2 max-w-2xl mx-auto">
          Disclaimer: All tips and signals are for educational purposes only. This platform does not provide financial or investment advice.
        </div>
      </div>
    </div>
  );
} 