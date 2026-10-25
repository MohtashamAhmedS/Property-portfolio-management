import Image from 'next/image'
import Link from 'next/link'

const DOT_COLORS = {
  Pending: '#C9822B',
  Paid: '#2F8A6F',
  Vacant: '#8A8A8A',
}

export default function PropertyCard({
  id,
  address,
  date,
  status = 'Pending',
  label = 'Waiting for Rent',
  photoUrl = null,
  image = '/property-placeholder.png',
}) {
  const card = (
    <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden">
      <Image
        src={photoUrl || image}
        alt={address}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        className="object-cover object-center"
      />

      {/* Dark fade at the bottom so the text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 55%)',
        }}
      />

      {/* Address */}
      <span className="absolute top-3 left-3 text-xs text-white">
        {address}
      </span>

      {/* Status, date and label */}
      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col items-start">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2 py-0.5 text-[10px] text-black">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: DOT_COLORS[status] ?? '#C9822B' }}
          />
          {status}
        </span>
        <span className="mt-1.5 text-xs text-white">{date}</span>
        <span className="text-xl md:text-2xl text-white leading-tight">
          {label}
        </span>
      </div>
    </div>
  )

  // Clickable when an id is given
  return id ? (
    <Link href={`/dashboard/properties/${id}`} className="block">
      {card}
    </Link>
  ) : (
    card
  )
}
