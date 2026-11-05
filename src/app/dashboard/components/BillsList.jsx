'use client'

import { useState } from 'react'

const FILTERS = ['All', 'Pending', 'Paid', 'Overdue']

const STATUS_STYLES = {
  Overdue: 'bg-[#C24B4B]/15 text-[#C24B4B]',
  Upcoming: 'bg-[#C9822B]/15 text-[#C9822B]',
  Paid: 'bg-[#2F8A6F]/15 text-[#2F8A6F]',
}

const DUAL_SHADOW =
  '-2px -2px 4px 0px rgba(0, 0, 0, 0.25), 2px 2px 4px 0px rgba(0, 0, 0, 0.25)'

const ICONS = {
  bolt: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  water: (
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  ),
  wifi: (
    <>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </>
  ),
  home: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
}

function BillIcon({ name }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#002C83]/10">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-[#002C83]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICONS[name] ?? ICONS.home}
      </svg>
    </div>
  )
}

function ActionButton({ status, onClick }) {
  if (status === 'Overdue') {
    return (
      <button
        onClick={onClick}
        className="rounded-lg bg-[#002C83] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.25)' }}
      >
        Pay now
      </button>
    )
  }
  if (status === 'Upcoming') {
    return (
      <button
        onClick={onClick}
        className="rounded-lg border border-[#002C83] bg-white px-4 py-1.5 text-xs font-medium text-[#002C83] transition-colors hover:bg-[#002C83]/5"
      >
        Pay now
      </button>
    )
  }
  return null
}

export default function BillsList({ bills = [], loading = false, onMarkPaid }) {
  const [filter, setFilter] = useState('All')

  const rows = bills.filter((b) => {
    if (filter === 'All') return true
    if (filter === 'Pending') return b.status === 'Upcoming'
    return b.status === filter
  })

  return (
    <div className="px-8 pt-6 pb-8">
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-[#002C83] text-white'
                  : 'bg-white text-black hover:bg-gray-50'
              }`}
              style={{ boxShadow: DUAL_SHADOW }}
            >
              {f}
            </button>
          )
        })}
      </div>

      {/* Bill rows */}
      <div className="mt-5 overflow-x-auto">
        <div className="flex min-w-[720px] flex-col gap-2">
          {rows.map((b) => (
            <div
              key={b.id}
              className="grid grid-cols-[2fr_2fr_1.2fr_0.8fr_1.6fr] items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <BillIcon name={b.icon} />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#002C83]">
                    {b.name}
                  </span>
                  {b.note && (
                    <span className="text-[11px] text-gray-500">{b.note}</span>
                  )}
                </div>
              </div>

              <span className="text-xs text-gray-500">{b.place}</span>

              <div className="flex flex-col">
                <span className="text-xs text-gray-700">{b.due}</span>
                <span className="text-[11px] text-gray-400">{b.rel}</span>
              </div>

              <span className="text-xs font-bold text-black">
                ${b.amount.toLocaleString()}
              </span>

              <div className="flex items-center justify-end gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[b.status]}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {b.status}
                </span>
                <ActionButton
                  status={b.status}
                  onClick={() => onMarkPaid?.(b.id)}
                />
              </div>
            </div>
          ))}

          {loading ? (
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-400">
              Loading...
            </div>
          ) : (
            rows.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-400">
                {bills.length === 0
                  ? 'No bills yet. Click "Add bill" to create one.'
                  : 'No bills found.'}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
