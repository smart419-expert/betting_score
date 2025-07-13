import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

export default function BetSlipsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <DocumentDuplicateIcon className="w-16 h-16 text-primary-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Bet Slips</h1>
      <p className="text-gray-600 max-w-md mb-4">Manage your bet slips, track your betting history, and analyze your results. Create new bet slips and review past performance here.</p>
      <div className="bg-primary-50 border border-primary-100 rounded-lg px-4 py-2 text-primary-700 text-sm">Coming soon: Bet slip builder and history!</div>
    </div>
  );
} 