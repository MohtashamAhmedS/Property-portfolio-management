import Image from 'next/image'

export default function PropertyCard({
  address,
  date,
  status = 'Pending',
  label = 'Waiting for Rent',
  image = '/property-placeholder.png',
}) {
  return (
    <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden">
      <Image
        src={image}
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
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8A04A]" />
          {status}
        </span>
        <span className="mt-1.5 text-xs text-white">{date}</span>
        <span className="text-xl md:text-2xl text-white leading-tight">
          {label}
        </span>
      </div>
    </div>
  )
}
