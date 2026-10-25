'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 shrink-0"
      >
        <path d="M3 9.5 12 3l9 6.5" />
        <path d="M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10" />
      </svg>
    ),
  },
  {
    label: 'Properties',
    href: '/dashboard/properties',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 shrink-0"
      >
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    label: 'Rents',
    href: '/dashboard/rents',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 shrink-0"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    label: 'Bills',
    href: '/dashboard/bills',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 shrink-0"
      >
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [collapsed, setCollapsed] = useState(false) // pinned state
  const [hovered, setHovered] = useState(false)

  // Open when pinned open, or when collapsed but being hovered
  const isOpen = !collapsed || hovered

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    // Wrapper keeps the layout footprint fixed so content doesn't shift on hover
    <div
      className={`relative h-full shrink-0 transition-[width] duration-300 ease-in-out ${
        collapsed ? 'w-[80px]' : 'w-[220px]'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <aside
        className={`absolute inset-y-0 left-0 z-20 bg-[#002C83] rounded-3xl flex flex-col px-3 py-6 overflow-hidden transition-[width,box-shadow] duration-300 ease-in-out ${
          isOpen ? 'w-[220px]' : 'w-[80px]'
        } ${collapsed && hovered ? 'shadow-2xl' : ''}`}
      >
        {/* Heading: logo + pin/unpin toggle */}
        <div
          className={`flex items-center mb-8 ${
            isOpen ? 'justify-between px-2' : 'justify-center'
          }`}
        >
          {isOpen ? (
            <>
              <Link href="/dashboard" aria-label="Portfolio dashboard">
                <Image
                  src="/logo2.png"
                  alt="Portfolio"
                  width={130}
                  height={40}
                  className="w-[130px] h-auto"
                  priority
                />
              </Link>

              <button
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
                aria-label={
                  collapsed ? 'Keep sidebar open' : 'Collapse sidebar'
                }
                aria-pressed={!collapsed}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-5 h-5 transition-transform duration-300 ${
                    collapsed ? 'rotate-180' : ''
                  }`}
                >
                  <path d="m15 6-6 6 6 6" />
                </svg>
              </button>
            </>
          ) : (
            // Collapsed rail: logo mark. Click also opens it (for touch screens, which have no hover)
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
              className="relative w-8 h-8 overflow-hidden"
            >
              <Image
                src="/logo2.png"
                alt="Portfolio"
                fill
                sizes="32px"
                className="object-cover object-left"
                priority
              />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                title={!isOpen ? item.label : undefined}
                className={`flex items-center gap-3 py-2.5 rounded-xl text-sm whitespace-nowrap transition-colors ${
                  isOpen ? 'px-3' : 'justify-center px-0'
                } ${
                  isActive
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout, pinned to the bottom */}
        <div className="mt-auto pt-4 border-t border-white/15">
          <button
            type="button"
            onClick={handleLogout}
            title={!isOpen ? 'Log out' : undefined}
            className={`w-full flex items-center gap-3 py-2.5 rounded-xl text-sm whitespace-nowrap text-white/70 hover:text-white hover:bg-white/10 transition-colors ${
              isOpen ? 'px-3' : 'justify-center px-0'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 shrink-0"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {isOpen && <span>Log out</span>}
          </button>
        </div>
      </aside>
    </div>
  )
}
