'use client'

import { useState } from 'react'

const FILTERS = ['All', 'Pending', 'Paid', 'Overdue']

const STATUS_STYLES = {
  Pending: 'bg-[#C9822B]/15 text-[#C9822B]',
  Paid: 'bg-[#2F8A6F]/15 text-[#2F8A6F]',
  Overdue: 'bg-[#C24B4B]/15 text-[#C24B4B]',
}

const DUAL_SHADOW =
  '-2px -2px 4px 0px rgba(0, 0, 0, 0.25), 2px 2px 4px 0px rgba(0, 0, 0, 0.25)'

export default function RentsTable({
  rents = [],
  loading = false,
  onMarkPaid,
}) {
  const [filter, setFilter] = useState('All')

  const rows =
    filter === 'All' ? rents : rents.filter((r) => r.status === filter)

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

              {r.status === 'Paid' ? (
                <span className="text-right text-xs text-gray-500">
                  {r.paidOn ? `Paid ${r.paidOn}` : 'Paid'}
                </span>
              ) : (
                <button
                  onClick={() => onMarkPaid?.(r.id)}
                  className="text-right text-xs font-bold text-[#002C83] hover:underline"
                >
                  Mark as paid
                </button>
              )}
            </div>
          ))}

          {loading ? (
            <div className="border-t border-gray-200 px-4 py-8 text-center text-sm text-gray-400">
              Loading...
            </div>
          ) : (
            rows.length === 0 && (
              <div className="border-t border-gray-200 px-4 py-8 text-center text-sm text-gray-400">
                {rents.length === 0
                  ? 'No rents yet. Click "Add rent" to create one.'
                  : 'No rents found.'}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
