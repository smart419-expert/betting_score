import { UserCircleIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/navbar';

export default function ProfilePage() {
  return (
    <div>
      <Navbar location="My Profile" />
      <div className="flex flex-col items-center justify-center min-h-[89.7vh] bg-[#1b1d1e] text-center text-white">
        <UserCircleIcon className="w-16 h-16 text-primary-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
        <p className="text-gray-600 max-w-md mb-4">Manage your profile, update your personal information, and configure your account settings here.</p>
        <div className="bg-primary-50 border border-primary-100 rounded-lg px-4 py-2 text-primary-700 text-sm">Coming soon: Profile editing and account settings!</div>
      </div>
    </div>
  );
} 