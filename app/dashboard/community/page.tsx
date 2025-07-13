import { UsersIcon } from '@heroicons/react/24/outline';

export default function CommunityPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <UsersIcon className="w-16 h-16 text-primary-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Community & Chat</h1>
      <p className="text-gray-600 max-w-md mb-4">Join the BASE44 community, chat with other members, and participate in discussions, groups, and live events.</p>
      <div className="bg-primary-50 border border-primary-100 rounded-lg px-4 py-2 text-primary-700 text-sm">Coming soon: Live chat and community features!</div>
    </div>
  );
} 