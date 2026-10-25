'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../../lib/supabase/client'

export default function DashboardHeader({
  title,
  subtitle,
  onAddProperty,
  buttonLabel = 'Add a property',
}) {
  const [initial, setInitial] = useState('')

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => {
        const meta = user?.user_metadata ?? {}
        const name = meta.full_name || meta.name || user?.email || ''
        setInitial(name.charAt(0).toUpperCase())
      })
  }, [])

  return (
    <div className="flex items-center justify-between gap-4 px-8 py-6 border-b border-gray-100">
      <div className="min-w-0">
        <h1 className="text-3xl md:text-4xl font-normal text-black leading-tight font-semibold">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button
          type="button"
          onClick={onAddProperty}
          className="h-[38px] rounded-xl bg-[#002C83] text-white text-sm font-medium px-4 shadow-[4px_2px_4px_rgba(0,0,0,0.25)] hover:brightness-110 active:translate-y-px transition-all"
        >
          {buttonLabel}
        </button>

        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8B98F] text-sm font-medium text-[#5a3a1c]"
          style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.25)' }}
        >
          {initial}
        </div>
      </div>
    </div>
  )
}
