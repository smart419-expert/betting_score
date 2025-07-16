'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    name: 'David M.',
    role: 'Professional Bettor',
    avatar: '/avatars/david.jpg',
    content: 'Gambino has completely transformed my betting strategy. The AI-powered tips are incredibly accurate, and the bet builder lets me customize everything to my risk tolerance. I\'ve seen a 40% increase in my ROI since joining.',
    rating: 5,
    location: 'Johannesburg, SA'
  },
  {
    name: 'Sarah K.',
    role: 'Forex Trader',
    avatar: '/avatars/sarah.jpg',
    content: 'The forex signals are spot-on! I love how they provide clear entry and exit points with proper risk management. The community is also amazing - I\'ve learned so much from other traders.',
    rating: 5,
    location: 'Cape Town, SA'
  },
  {
    name: 'Michael T.',
    role: 'Sports Enthusiast',
    avatar: '/avatars/michael.jpg',
    content: 'As someone new to betting, Gambino has been a game-changer. The explanations are easy to understand, and the confidence scores help me make informed decisions. The free trial convinced me to upgrade.',
    rating: 5,
    location: 'Durban, SA'
  },
  {
    name: 'Lisa P.',
    role: 'Influencer',
    avatar: '/avatars/lisa.jpg',
    content: 'The influencer features are fantastic! I can share my tips with my followers and earn commissions. The analytics help me track my performance and grow my audience.',
    rating: 5,
    location: 'Pretoria, SA'
  },
  {
    name: 'John D.',
    role: 'Weekend Bettor',
    avatar: '/avatars/john.jpg',
    content: 'Perfect for weekend betting! The tips are ready when I need them, and the mobile app makes it super convenient. I\'ve been consistently profitable since using Gambino.',
    rating: 5,
    location: 'Port Elizabeth, SA'
  },
  {
    name: 'Emma R.',
    role: 'Data Analyst',
    avatar: '/avatars/emma.jpg',
    content: 'I appreciate the data-driven approach. The platform provides detailed statistics and analysis that help me understand why certain tips are recommended. Very transparent and professional.',
    rating: 5,
    location: 'Bloemfontein, SA'
  }
]

export function TestimonialsSection() {
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
            What Our{' '}
            <span className="text-gradient">Users Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of satisfied users who have transformed their betting 
            experience with Gambino's data-driven insights.
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.9/5</span>
            <span className="text-gray-600">from 2,500+ reviews</span>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-hover"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} • {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">10,000+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">85%+</div>
            <div className="text-gray-600">Tip Accuracy</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">R2.5M+</div>
            <div className="text-gray-600">User Winnings</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join the Success Stories
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Start your journey towards smarter betting today. Join thousands of users 
              who have already discovered the power of data-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Free Trial
              </button>
              <button className="btn-outline">
                Read More Reviews
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 