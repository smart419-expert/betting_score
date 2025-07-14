'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

const benefits = [
  '7-day free trial for all paid plans',
  '20% off first month for early subscribers',
  'No credit card required for trial',
  'Cancel anytime, no hidden fees',
  '30-day money-back guarantee',
  '24/7 customer support'
]

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your{' '}
              <span className="text-yellow-300">Betting Game?</span>
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Join thousands of successful bettors who trust Gambino for their betting decisions. 
              Start your free trial today and experience the power of data-driven insights.
            </p>
          </motion.div>

          {/* Urgency Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-yellow-400 text-yellow-900 rounded-xl p-4 mb-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-2">
              <ClockIcon className="w-5 h-5" />
              <span className="font-semibold">
                🎉 FREE TRIAL: July 20-27 • 20% OFF: First month for subscribers before July 27
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-colors flex items-center justify-center group">
              Start Free Trial Now
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-4 px-8 rounded-lg text-lg transition-colors">
              Watch Platform Demo
            </button>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 text-primary-100">
                <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-primary-500 pt-8"
          >
            <p className="text-primary-200 text-sm mb-4">
              Trusted by 10,000+ users across Africa
            </p>
            <div className="flex flex-wrap justify-center items-center space-x-8 text-primary-200">
              <div className="text-center">
                <div className="text-2xl font-bold">85%+</div>
                <div className="text-xs">Tip Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-xs">User Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">R2.5M+</div>
                <div className="text-xs">User Winnings</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 