import { LightBulbIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/navbar';

export default function TipsPage() {
  return (
    <div>
      <Navbar location="Sports Preview" />
      <div className="flex flex-col items-center justify-center min-h-[89.7vh] bg-[#1b1d1e] text-center text-white">
        <LightBulbIcon className="w-16 h-16 text-primary-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">My Tips</h1>
        <p className="text-gray-600 max-w-md mb-4">View and manage your submitted sports and forex tips. Add new tips, edit existing ones, and track your tip performance here.</p>
        <div className="bg-primary-50 border border-primary-100 rounded-lg px-4 py-2 text-primary-700 text-sm">Coming soon: Full tip management and analytics!</div>
      </div>
    </div>
  );
} 