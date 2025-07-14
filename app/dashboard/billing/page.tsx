import { CreditCardIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/navbar';

export default function BillingPage() {
  return (
    <div>
      <Navbar location="Wallet" />
      <div className="flex flex-col items-center justify-center min-h-[89.7vh] bg-[#1b1d1e] text-center text-white">
        <CreditCardIcon className="w-16 h-16 text-primary-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
        <p className="text-gray-600 max-w-md mb-4">Manage your subscription, view invoices, and update your payment methods securely from this page.</p>
        <div className="bg-primary-50 border border-primary-100 rounded-lg px-4 py-2 text-primary-700 text-sm">Coming soon: Subscription management and billing history!</div>
      </div>
    </div>
  );
} 