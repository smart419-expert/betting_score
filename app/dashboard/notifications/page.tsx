import { BellAlertIcon } from '@heroicons/react/24/outline';

export default function NotificationsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <BellAlertIcon className="w-16 h-16 text-primary-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Notifications</h1>
      <p className="text-gray-600 max-w-md mb-4">Stay up to date with the latest alerts, updates, and messages from the BASE44 platform and your community.</p>
      <div className="bg-primary-50 border border-primary-100 rounded-lg px-4 py-2 text-primary-700 text-sm">Coming soon: Real-time notifications and alerts!</div>
    </div>
  );
} 