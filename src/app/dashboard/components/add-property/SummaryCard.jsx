import Link from 'next/link'
import FormCard from './FormCard'

function SummaryRow({ label, value, first }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-3 ${
        first ? '' : 'border-t border-gray-200'
      }`}
    >
      <span className="text-sm text-gray-500">{label}</span>
      <span className="max-w-[170px] truncate text-sm font-medium text-black">
        {value}
      </span>
    </div>
  )
}

export default function SummaryCard({ address, type, rent, tenant }) {
  return (
    <FormCard title="Summary" subtitle="Updates as you fill in the form.">
      <div className="-mt-1">
        <SummaryRow first label="Address" value={address || '—'} />
        <SummaryRow label="Type" value={type} />
        <SummaryRow label="Monthly rent" value={rent || '—'} />
        <SummaryRow label="Tenant" value={tenant || 'Vacant'} />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <button
          type="submit"
          className="w-full rounded-full bg-[#002C83] px-4 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Save property
        </button>
        <Link
          href="/dashboard/properties"
          className="w-full rounded-full border border-[#002C83] bg-white px-4 py-3.5 text-center text-sm font-bold text-[#002C83] transition-colors hover:bg-[#002C83]/5"
        >
          Cancel
        </Link>
      </div>
    </FormCard>
  )
}
