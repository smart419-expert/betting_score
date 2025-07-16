'use client'

import { motion } from 'framer-motion'
import { 
  UserPlusIcon, 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline'

const steps = [
  {
    icon: UserPlusIcon,
    title: 'Join BASE44',
    description: 'Sign up for free and start exploring our platform. No credit card required for the trial.',
    details: [
      'Quick 2-minute registration',
      'Instant access to free features',
      '7-day free trial for all paid plans'
    ]
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Explore Tips & Signals',
    description: 'Browse through our AI-generated betting tips and forex signals with detailed analysis.',
    details: [
      'Filter by sport, league, or match',
      'View confidence scores and odds',
      'Read data-backed explanations'
    ]
  },
  {
    icon: ChartBarIcon,
    title: 'Customize & Build',
    description: 'Use our smart bet builder to customize tips to your risk tolerance and preferences.',
    details: [
      'Adjust tip thresholds',
      'Get real-time odds updates',
      'Generate booking codes'
    ]
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Start Winning',
    description: 'Place your bets with confidence using our data-driven insights and track your success.',
    details: [
      'Follow tip performance',
      'Join community discussions',
      'Access advanced analytics'
    ]
  }
]

export function HowItWorksSection() {
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
            How BASE44{' '}
            <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with BASE44 is simple. Follow these four easy steps to begin 
            your journey towards smarter betting decisions.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>

              {/* Step Card */}
              <div className="card-hover p-6 pt-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <step.icon className="w-6 h-6 text-primary-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {step.description}
                </p>
                
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-200 transform -translate-y-1/2"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of successful bettors who have already discovered the power 
              of data-driven betting with BASE44.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Free Trial
              </button>
              <button className="btn-outline">
                Watch Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 