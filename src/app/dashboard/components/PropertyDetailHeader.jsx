import Link from 'next/link'

export default function PropertyDetailHeader({
  name,
  city,
  type,
  onEdit,
  onRecordPayment,
}) {
  return (
    <div className="px-8 pt-5">
      {/* Top row: back link + avatar */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/properties"
          className="flex items-center gap-1.5 text-[11px] text-gray-500 transition-colors hover:text-[#002C83]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to properties
        </Link>

        <div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8B98F] text-[11px] font-medium text-[#5a3a1c]"
          style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.25)' }}
        >
          M
        </div>
      </div>

      {/* Title row */}
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium text-black leading-tight">
            {name}
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            {city} · {type}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onEdit}
            className="rounded-lg border border-[#002C83] bg-white px-4 py-2 text-xs font-medium text-[#002C83] transition-colors hover:bg-[#002C83]/5"
          >
            Edit property
          </button>
          <button
            onClick={onRecordPayment}
            className="rounded-lg bg-[#002C83] px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
            style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.25)' }}
          >
            Record a payment
          </button>
        </div>
      </div>
    </div>
  )
}
