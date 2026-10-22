import Image from 'next/image'

const STATUS = {
  pending: { label: 'Pending', color: '#B8A04A' },
  paid: { label: 'Paid', color: '#3E9B63' },
  vacant: { label: 'Vacant', color: '#8A8A8A' },
}

export default function PropertyListingCard({
  street,
  city,
  tenant,
  rent,
  status = 'pending',
  image = '/property-placeholder.png',
}) {
  const { label, color } = STATUS[status]

  return (
    <article
      className="rounded-2xl bg-white overflow-hidden"
      style={{ boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.25)' }}
    >
      {/* Photo + status pill */}
      {/* Photo + status pill */}
      <div className="relative aspect-[19/10] overflow-hidden bg-gray-200">
        <Image
          src={image}
          alt={`${street}, ${city}`}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover scale-[1.02]"
        />
        <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2 py-0.5 text-[10px] text-gray-600">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
          {label}
        </span>
      </div>

      {/* Details */}
      <div className="px-4 pt-3 pb-3">
        <h3 className="text-lg text-black leading-tight">{street}</h3>
        <p className="text-xs text-gray-500">{city}</p>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>
            Tenant:{' '}
            <span className="text-black font-medium">{tenant ?? '—'}</span>
          </span>
          <span>${rent}/mo</span>
        </div>
      </div>
    </article>
  )
}
