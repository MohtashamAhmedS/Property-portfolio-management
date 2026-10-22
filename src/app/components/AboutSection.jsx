'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Button from './Button'

export default function AboutSection() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center overflow-hidden mt-18 mb-18">
      {/* Left - text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-6 px-6 md:pl-20 py-16 md:py-24"
      >
        <h2 className="text-4xl md:text-5xl font-semibold">
          <span className="text-black">About </span>
          <span className="text-[#002C83]">Us</span>
        </h2>

        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          Managing properties and bills doesn't have to be stressful. Our
          platform is designed for both landlords and tenants, giving you the
          tools to track payments, store important details, and receive timely
          reminders. No more juggling spreadsheets or forgetting due
          dates—everything is in one secure, easy-to-use place.
        </p>

        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          Whether you own multiple properties or are living on rent yourself,
          our software helps you stay in control of rent, electricity, water,
          and maintenance bills—all with automated reminders straight to your
          email.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary">What we purpose</Button>
          <Button variant="secondary">Learn more</Button>
        </div>
      </motion.div>

      {/* Right - dashboard image, bleeds off the right edge */}
      <div className="w-full px-6 md:px-0 md:w-[80%]">
        <div className="relative w-full h-[300px] md:h-[800px] md:mr-0">
          {/* Mobile - appears/fades in */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative w-full h-full md:hidden"
          >
            <Image
              src="/dashboard-image.png"
              alt="Dashboard preview"
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
              className="object-contain rounded-3xl"
              quality={100}
            />
          </motion.div>

          {/* Desktop - slides in from the right to its position */}
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative w-full h-full hidden md:block"
          >
            <Image
              src="/dashboard-image2.png"
              alt="Dashboard preview"
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-contain object-right"
              quality={100}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
