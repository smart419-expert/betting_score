import { ChartBarIcon } from '@heroicons/react/24/outline';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <ChartBarIcon className="w-16 h-16 text-primary-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Performance Analytics</h1>
      <p className="text-gray-600 max-w-md mb-4">Visualize your betting and tipster performance with interactive charts and advanced analytics. Track your progress and optimize your strategies.</p>
      <div className="bg-primary-50 border border-primary-100 rounded-lg px-4 py-2 text-primary-700 text-sm">Coming soon: Interactive analytics and charts!</div>
    </div>
  );
}
