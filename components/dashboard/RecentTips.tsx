'use client'

import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

interface Tip {
  id: number
  match: string
  tip: string
  odds: string
  confidence: number
  status: 'pending' | 'won' | 'lost'
  time: string
}

interface RecentTipsProps {
  tips: Tip[]
}

export function RecentTips({ tips }: RecentTipsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won':
        return <CheckCircleIcon className="w-5 h-5 text-success-500" />
      case 'lost':
        return <XCircleIcon className="w-5 h-5 text-danger-500" />
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-warning-500" />
      default:
        return <ClockIcon className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won':
        return 'bg-success-100 text-success-800'
      case 'lost':
        return 'bg-danger-100 text-danger-800'
      case 'pending':
        return 'bg-warning-100 text-warning-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-success-600'
    if (confidence >= 80) return 'text-warning-600'
    return 'text-danger-600'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Recent Tips</h3>
        <button className="text-sm text-primary-600 hover:text-primary-500 font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusIcon(tip.status)}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tip.status)}`}>
                    {tip.status.charAt(0).toUpperCase() + tip.status.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">{tip.time}</span>
                </div>
                
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {tip.match}
                </h4>
                
                <div className="mt-2 flex items-center space-x-4 text-sm">
                  <span className="text-gray-600">
                    <span className="font-medium">Tip:</span> {tip.tip}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">Odds:</span> {tip.odds}
                  </span>
                  <span className={`font-medium ${getConfidenceColor(tip.confidence)}`}>
                    {tip.confidence}% confidence
                  </span>
                </div>
              </div>
              
              <div className="ml-4 flex-shrink-0">
                <button className="text-primary-600 hover:text-primary-500 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 