'use client'

import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CogIcon
} from '@heroicons/react/24/outline'

const actions = [
  {
    name: 'Browse Tips',
    description: 'Explore today\'s betting tips',
    icon: MagnifyingGlassIcon,
    href: '/dashboard/tips',
    color: 'bg-primary-100 text-primary-600'
  },
  {
    name: 'Build Bet',
    description: 'Create custom betting slips',
    icon: PlusIcon,
    href: '/dashboard/builder',
    color: 'bg-success-100 text-success-600'
  },
  {
    name: 'Forex Signals',
    description: 'View trading signals',
    icon: CurrencyDollarIcon,
    href: '/dashboard/forex',
    color: 'bg-warning-100 text-warning-600'
  },
  {
    name: 'Join Chat',
    description: 'Connect with community',
    icon: ChatBubbleLeftRightIcon,
    href: '/dashboard/chat',
    color: 'bg-secondary-100 text-secondary-600'
  },
  {
    name: 'Generate Codes',
    description: 'Create booking codes',
    icon: DocumentTextIcon,
    href: '/dashboard/codes',
    color: 'bg-gray-100 text-gray-600'
  },
  {
    name: 'Settings',
    description: 'Customize preferences',
    icon: CogIcon,
    href: '/dashboard/settings',
    color: 'bg-gray-100 text-gray-600'
  }
]

export function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.name}
            className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color} mr-4`}>
              <action.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{action.name}</h4>
              <p className="text-xs text-gray-500">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h4>
          <p className="text-xs text-gray-600 mb-3">
            Get instant support from our team or browse our help center.
          </p>
          <div className="flex space-x-2">
            <button className="text-xs bg-primary-600 text-white px-3 py-1 rounded-md hover:bg-primary-700 transition-colors">
              Contact Support
            </button>
            <button className="text-xs bg-white text-primary-600 px-3 py-1 rounded-md border border-primary-200 hover:bg-primary-50 transition-colors">
              Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 