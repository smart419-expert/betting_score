import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export default function AffiliatesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <ArrowTrendingUpIcon className="w-16 h-16 text-primary-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Affiliates & Referrals</h1>
      <p className="text-gray-600 max-w-md mb-4">Track your affiliate stats, referral earnings, and invite friends to join BASE44 for exclusive rewards.</p>
      <div className="bg-primary-50 border border-primary-100 rounded-lg px-4 py-2 text-primary-700 text-sm">Coming soon: Affiliate dashboard and referral tracking!</div>
    </div>
  );
} 