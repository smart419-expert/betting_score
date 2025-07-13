import { StarIcon } from '@heroicons/react/24/solid';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export interface Signal {
  id: number;
  pair: string;
  rating: number;
  date: string;
  entry: string;
  stopLoss: string;
  takeProfit: string;
  tags: string[];
  aiAnalysis: string;
  chartSetup: string;
  pipTarget: string;
  riskReward: string;
  status: 'active' | 'closed';
}

export function LiveSignalsFeed({ signals }: { signals: Signal[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-blue-400">&#8764;</span> Live Signals Feed
      </h2>
      <div className="space-y-6">
        {signals.map(signal => (
          <div key={signal.id} className="bg-[#181A20] border border-gray-700 rounded-xl p-6 text-white shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{signal.pair}</span>
                {signal.tags.map(tag => (
                  <span key={tag} className={`text-xs font-semibold px-2 py-0.5 rounded-full mr-1 ${tag === 'SELL' ? 'bg-red-700 text-red-200' : tag === 'BUY' ? 'bg-green-700 text-green-200' : tag === 'ACTIVE' ? 'bg-yellow-600 text-yellow-100' : 'bg-purple-800 text-purple-100'}`}>{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="font-bold">{signal.rating}/10</span>
                <span className="ml-2 text-xs text-gray-400">{signal.date}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-black/60 rounded-lg p-3 flex flex-col items-center">
                <span className="text-xs text-gray-400">Entry</span>
                <span className="font-mono text-lg font-bold text-white">{signal.entry}</span>
              </div>
              <div className="bg-black/60 rounded-lg p-3 flex flex-col items-center">
                <span className="text-xs text-gray-400">Stop Loss</span>
                <span className="font-mono text-lg font-bold text-red-400">{signal.stopLoss}</span>
              </div>
              <div className="bg-black/60 rounded-lg p-3 flex flex-col items-center">
                <span className="text-xs text-gray-400">Take Profit</span>
                <span className="font-mono text-lg font-bold text-green-400">{signal.takeProfit}</span>
              </div>
            </div>
            <div className="bg-gray-900/70 rounded-lg p-4 mb-2">
              <div className="flex items-center gap-2 mb-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-gray-200">AI Analysis</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">{signal.aiAnalysis}</p>
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h2" /></svg>
                <span className="font-semibold text-gray-200">Chart Setup</span>
              </div>
              <p className="text-sm text-gray-300">{signal.chartSetup}</p>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span>&#9679; Pip Target: <span className="font-bold text-white">{signal.pipTarget}</span></span>
              <span>Risk/Reward: <span className="font-bold text-white">{signal.riskReward}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 