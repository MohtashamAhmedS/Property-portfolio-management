'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="relative flex items-center justify-between px-4 py-4 md:px-8 md:py-4 border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={140} height={40} priority />
        </Link>
      </div>

      {/* Middle links - desktop */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className="text-black hover:text-[#002C83] transition-colors"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-black hover:text-[#002C83] transition-colors"
        >
          About
        </Link>
        <Link
          href="/features"
          className="text-black hover:text-[#002C83] transition-colors"
        >
          Features
        </Link>
      </div>

      {/* Right side - desktop */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/login"
          className="text-black hover:text-[#002C83] transition-colors"
        >
          Login
        </Link>
        <Button href="/get-started">Get Started</Button>
      </div>

      {/* Hamburger button - mobile */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-black transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
        />
        <span
          className={`block h-0.5 w-6 bg-black transition-opacity ${isOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`block h-0.5 w-6 bg-black transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
        />
      </button>

      {/* Mobile menu */}
      <div
        className={`absolute top-full left-0 w-full flex flex-col items-center gap-4 py-6 bg-white shadow-lg md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-96 opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <Link
          href="/"
          className="text-black hover:text-[#002C83]"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-black hover:text-[#002C83]"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link
          href="/features"
          className="text-black hover:text-[#002C83]"
          onClick={() => setIsOpen(false)}
        >
          Features
        </Link>
        <Link
          href="/login"
          className="text-black hover:text-[#002C83]"
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
        <div onClick={() => setIsOpen(false)}>
          <Button href="/get-started">Get Started</Button>
        </div>
      </div>
    </nav>
  )
}
