'use client'

import { motion } from 'framer-motion'

const features = [
  {
    title: 'Multi-Property & Multi-Bill Management',
    description:
      'Add as many properties as you own or rent. Track rent, electricity, water, maintenance, and other recurring bills with ease.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <path d="M3 9.5 12 3l9 6.5" />
        <path d="M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10" />
      </svg>
    ),
  },
  {
    title: 'Automated Email Reminders',
    description:
      "Never worry about late payments again. Get notified before due dates so you're always on time.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    title: 'For Landlords & Tenants Alike',
    description:
      'Our platform works for both landlords and tenants, helping everyone track rent, bills, and monthly expenses with ease.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
        <circle cx="18" cy="9" r="2.5" />
        <path d="M15.5 14.5c2.5.3 4.5 2 4.5 5.5" />
      </svg>
    ),
  },
  {
    title: 'Secure & Private Data',
    description:
      'Your information is fully encrypted so only you have access. Even admins cannot view your private records.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    ),
  },
  {
    title: 'Simple Dashboard Overview',
    description:
      'See upcoming payments, overdue bills, and completed transactions—all in one clean, easy-to-read dashboard.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="5" rx="1.5" />
        <rect x="13" y="12" width="8" height="9" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
      </svg>
    ),
  },
  {
    title: 'Organized Record Keeping',
    description:
      'No more scattered notes or lost receipts. Keep track of contracts, tenant details, and bill history securely.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <circle cx="12" cy="4" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="M12 6v6M12 12 6 16M12 12l6 4" />
      </svg>
    ),
  },
]

export default function FeaturesSection() {
  return (
    <section className="w-full px-6 md:px-16 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col items-center text-center mb-12 md:mb-16"
      >
        <span className="text-[#002C83] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
          Features
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold text-black">
          What We Offer
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 30,
              boxShadow: '2px 2px 8px 2px rgba(0, 44, 131, 0.3)',
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
            whileHover={{
              boxShadow: '0px 0px 4px 0px rgba(0, 44, 131, 0.15)',
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
            className="group bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-3"
          >
            <div className="text-[#002C83]">{feature.icon}</div>
            <h3 className="text-2xl font-semibold text-[#002C83] leading-tight">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
