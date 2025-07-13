'use client'

import { motion } from 'framer-motion'
import { CheckIcon, StarIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const plans = [
  {
    name: 'Free',
    price: 'R0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'View up to 3 tips/day',
      'Limited tip explorer',
      'Basic match information',
      'Community access (read-only)'
    ],
    cta: 'Get Started',
    popular: false,
    color: 'border-gray-200'
  },
  {
    name: 'Starter',
    price: 'R99',
    period: 'per month',
    description: 'Full access to betting tips',
    features: [
      'Full tip access',
      'Basic tip customization',
      'Bet code generator',
      'Email notifications',
      'Basic chatroom access',
      'Mobile app access'
    ],
    cta: 'Start Free Trial',
    popular: false,
    color: 'border-primary-200'
  },
  {
    name: 'Pro',
    price: 'R199',
    period: 'per month',
    description: 'Advanced features for serious bettors',
    features: [
      'Everything in Starter',
      'Forex signals (2-4 daily)',
      'Advanced tip customization',
      'Live odds tracking',
      'Full chatroom access',
      'AI agent chat',
      'Priority support',
      'Advanced analytics'
    ],
    cta: 'Start Free Trial',
    popular: true,
    color: 'border-primary-500'
  },
  {
    name: 'Elite',
    price: 'R350',
    period: 'per month',
    description: 'Complete platform access',
    features: [
      'Everything in Pro',
      'BetCast premium audio',
      'Influencer cubicles',
      'Advanced CRM tools',
      'Custom alerts',
      'Exclusive community access',
      'Personal account manager',
      'Advanced filters & insights'
    ],
    cta: 'Start Free Trial',
    popular: false,
    color: 'border-secondary-200'
  }
]

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const getDiscountedPrice = (price: string) => {
    if (!isAnnual) return price
    const numericPrice = parseInt(price.replace('R', ''))
    const annualPrice = Math.round(numericPrice * 10) // 2 months free
    return `R${annualPrice}`
  }

  return (
    <section className="py-20 bg-gray-50">
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
            Choose Your{' '}
            <span className="text-gradient">Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start with our free trial and upgrade as you grow. All paid plans include 
            our 7-day free trial and 20% off your first month.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual <span className="text-success-600 font-medium">(Save 20%)</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col justify-between h-full bg-white rounded-2xl shadow-soft border-2 ${plan.color} p-8 ${
                plan.popular ? 'ring-2 ring-primary-500 z-10' : ''
              }`}
              style={{ minHeight: 520 }}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                  <span className="flex justify-center bg-primary-600 text-white px-5 py-1.5 rounded-full text-base font-semibold shadow-lg flex items-center w-[12rem]">
                    <StarIcon className="w-4 h-4 mr-2" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Content */}
              <div className="flex-1 flex flex-col">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {getDiscountedPrice(plan.price)}
                    </span>
                    <span className="text-gray-500 ml-1">
                      /{isAnnual ? 'year' : plan.period}
                    </span>
                  </div>
                  {isAnnual && plan.price !== 'R0' && (
                    <p className="text-sm text-success-600 font-medium">
                      Save R{Math.round(parseInt(plan.price.replace('R', '')) * 2.4)} per year
                    </p>
                  )}
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-auto pt-4 flex items-end">
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors shadow-md ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : plan.name === 'Free'
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              🎉 Special Launch Offer
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              <strong>FREE TRIAL:</strong> July 20-27 • <strong>20% OFF:</strong> First month for all subscribers who join before July 27
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors">
                Claim Your Discount
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600 text-sm">Yes, you can cancel your subscription at any time with no cancellation fees.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">What's included in the free trial?</h4>
              <p className="text-gray-600 text-sm">Full access to all features for 7 days, no credit card required.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600 text-sm">30-day money-back guarantee for all paid subscriptions.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Can I upgrade/downgrade?</h4>
              <p className="text-gray-600 text-sm">Yes, you can change your plan at any time from your account settings.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 