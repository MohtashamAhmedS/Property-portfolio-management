'use client'

import { useState } from 'react'

const RENTS = [
  {
    id: 1,
    property: 'AB Avenue',
    tenant: 'J. Carter',
    amount: 1200,
    due: '06 Aug',
    status: 'Pending',
  },
  {
    id: 2,
    property: 'CD Avenue',
    tenant: 'R. Nolan',
    amount: 1450,
    due: '01 Aug',
    status: 'Paid',
  },
  {
    id: 3,
    property: 'GH Avenue',
    tenant: 'S. Malik',
    amount: 1300,
    due: '03 Aug',
    status: 'Paid',
  },
  {
    id: 4,
    property: 'IJ Avenue',
    tenant: 'D. Osei',
    amount: 1250,
    due: '10 Aug',
    status: 'Pending',
  },
  {
    id: 5,
    property: 'KL Avenue',
    tenant: 'T. Rowe',
    amount: 900,
    due: '28 Jul',
    status: 'Overdue',
  },
]

const FILTERS = ['All', 'Pending', 'Paid', 'Overdue']

const STATUS_STYLES = {
  Pending: 'bg-[#C9822B]/15 text-[#C9822B]',
  Paid: 'bg-[#2F8A6F]/15 text-[#2F8A6F]',
  Overdue: 'bg-[#C24B4B]/15 text-[#C24B4B]',
}

const DUAL_SHADOW =
  '-2px -2px 4px 0px rgba(0, 0, 0, 0.25), 2px 2px 4px 0px rgba(0, 0, 0, 0.25)'

export default function RentsTable() {
  const [filter, setFilter] = useState('All')

  const rows =
    filter === 'All' ? RENTS : RENTS.filter((r) => r.status === filter)

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

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <div className="min-w-[640px]">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1.2fr_1.2fr_1.2fr_1fr] items-center bg-gray-50 px-4 py-3 text-[14px] font-bold text-gray-500">
            <span>Property / Tenant</span>
            <span>Amount</span>
            <span>Due date</span>
            <span>Status</span>
            <span />
          </div>

          {/* Rows */}
          {rows.map((r) => (
            <div
              key={r.id}
              className="grid grid-cols-[2fr_1.2fr_1.2fr_1.2fr_1fr] items-center border-t border-gray-200 px-4 py-3 hover:bg-gray-50/60"
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#002C83]">
                  {r.property}
                </span>
                <span className="text-[11px] text-gray-500">{r.tenant}</span>
              </div>

              <span className="text-l font-bold text-[#002C83]">
                ${r.amount.toLocaleString()}
              </span>

              <span className="text-xs text-gray-600">{r.due}</span>

              <span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[r.status]}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {r.status}
                </span>
              </span>

              <button className="text-right text-xs font-bold text-[#002C83] hover:underline">
                {r.status === 'Paid' ? 'View receipt' : 'Send reminder'}
              </button>
            </div>
          ))}

          {rows.length === 0 && (
            <div className="border-t border-gray-200 px-4 py-8 text-center text-sm text-gray-400">
              No rents found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
