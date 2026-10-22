import Image from 'next/image'

const STATUS_BADGES = {
  pending: { label: 'Rent pending', className: 'text-[#C9822B]' },
  paid: { label: 'Paid', className: 'text-[#2F8A6F]' },
  vacant: { label: 'Vacant', className: 'text-gray-500' },
}

const CARD_SHADOW = '2px 2px 4px 0px rgba(0, 0, 0, 0.25)'

function Detail({ value, label }) {
  return (
    <div className="flex flex-col">
      <span className="text-lg font-bold text-black leading-tight">
        {value}
      </span>
      <span className="mt-1 text-xs text-gray-500">{label}</span>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-bold text-[#002C83]">{value}</span>
    </div>
  )
}

export default function PropertyOverview({
  image = '/property-placeholder.png',
  status = 'pending',
  bedrooms,
  bathrooms,
  floorArea,
  yearBuilt,
  rent,
  nextDue,
  lastPayment,
}) {
  const badge = STATUS_BADGES[status] ?? STATUS_BADGES.pending

  return (
    <section className="grid grid-cols-1 gap-4 px-8 pt-6 pb-8 lg:grid-cols-[1.25fr_1fr]">
      {/* Property image */}
      <div
        className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-gray-200"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <Image
          src={image}
          alt="Property"
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />

        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium ${badge.className}`}
          style={{ boxShadow: CARD_SHADOW }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {badge.label}
        </span>
      </div>

      {/* Property details */}
      <div
        className="flex flex-col justify-between rounded-2xl bg-white p-7"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <div>
          <h2 className="text-base font-medium text-black">Property details</h2>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
            <Detail value={bedrooms} label="Bedrooms" />
            <Detail value={bathrooms} label="Bathrooms" />
            <Detail
              value={`${floorArea.toLocaleString()} sq ft`}
              label="Floor area"
            />
            <Detail value={yearBuilt} label="Year built" />
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-[#002C83]">
              ${rent.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">/ month</span>
          </p>

          <div className="mt-4 flex flex-col gap-3">
            <Row label="Next rent due" value={nextDue} />
            <Row label="Last payment" value={lastPayment} />
          </div>
        </div>
      </div>
    </section>
  )
}
