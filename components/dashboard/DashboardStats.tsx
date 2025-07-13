'use client'

import { motion } from 'framer-motion'
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid'

interface Stat {
  name: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  icon: React.ComponentType<{ className?: string }>
}

interface DashboardStatsProps {
  stats: Stat[]
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-soft p-6"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary-600" />
              </div>
            </div>
            <div className="ml-4 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <div className={`ml-2 flex items-baseline text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 flex-shrink-0 self-center" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4 flex-shrink-0 self-center" />
                  )}
                  <span className="ml-1">{stat.change}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 