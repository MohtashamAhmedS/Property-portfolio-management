'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Button from './Button'

export default function CTASection() {
  return (
    <section className="w-full px-6 md:px-16 py-16 md:py-24">
      <div className="relative w-full max-w-6xl mx-auto min-h-[420px] md:h-[320px] rounded-3xl overflow-hidden">
        <Image
          src="/cta-bg.png"
          alt="Call to action background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={100}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 py-10 gap-4"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Ready to get started?
          </h2>

          <p className="max-w-xl text-sm md:text-base text-white/90 leading-relaxed">
            With plenty of options to manage your bills, Portfolio helps you
            stay on top of utilities, expenses, and rent—so you can focus on
            living, not paperwork.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button variant="secondary">Learn More</Button>
            <Button variant="primary">Get Started</Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
