'use client'

import { motion } from 'framer-motion'
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  CogIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  BellIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: ChartBarIcon,
    title: 'AI-Powered Tip Generation',
    description: 'Advanced algorithms analyze live data from AIScore, LiveScore, SofaScore, and WinDrawWin to generate accurate betting suggestions with confidence scores.',
    details: [
      'Real-time odds movement tracking',
      'Player form and injury analysis',
      'Head-to-head statistics',
      'Bookmaker discrepancy detection'
    ]
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Forex Signal Center',
    description: 'Daily forex trading signals covering major pairs, XAU/USD, and indices with precise entry, stop-loss, and take-profit levels.',
    details: [
      '2-4 daily trade suggestions',
      'Chart analysis with images',
      'News impact detection',
      'Risk management guidelines'
    ]
  },
  {
    icon: CogIcon,
    title: 'Smart Bet Builder',
    description: 'Customize any tip to match your risk tolerance. Change thresholds, adjust odds, and get instant confidence score updates.',
    details: [
      'Customizable tip thresholds',
      'Real-time odds adjustment',
      'Confidence score calculation',
      'Multi-bookmaker support'
    ]
  },
  {
    icon: DocumentTextIcon,
    title: 'Bet Code Generator',
    description: 'Generate booking codes for Betway, Easybet, and HollywoodBets. Convert codes between bookmakers automatically.',
    details: [
      'Multi-bookmaker support',
      'Automatic code conversion',
      'PDF/Excel export',
      'Code validation system'
    ]
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'AI Agent Chat',
    description: 'Ask questions about players, teams, or betting strategies. Get data-backed answers and personalized insights.',
    details: [
      'Natural language queries',
      'Player statistics lookup',
      'Team form analysis',
      'Strategy recommendations'
    ]
  },
  {
    icon: UserGroupIcon,
    title: 'Community & Influencers',
    description: 'Join chatrooms, collaborate with friends, and follow top influencers. Transparent ROI tracking and affiliate programs.',
    details: [
      'League-specific chatrooms',
      'Influencer cubicles',
      'Collaborative betting',
      'Affiliate dashboards'
    ]
  },
  {
    icon: BellIcon,
    title: 'Smart Notifications',
    description: 'Get instant alerts for odds changes, tip updates, and important betting opportunities.',
    details: [
      'Push notifications',
      'Odds movement alerts',
      'Tip update notifications',
      'Custom alert settings'
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Risk Management',
    description: 'Built-in risk assessment and bankroll management tools to help you bet responsibly.',
    details: [
      'Stake suggestions',
      'Risk level indicators',
      'Loss limit warnings',
      'Responsible gambling tools'
    ]
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for{' '}
            <span className="text-gradient">Smart Betting</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform combines cutting-edge AI technology with expert insights 
            to give you the edge in sports betting and forex trading.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-hover group"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Winning?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of successful bettors who trust BASE44 for their betting decisions. 
              Start your free trial today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Free Trial
              </button>
              <button className="btn-outline">
                View Pricing
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 