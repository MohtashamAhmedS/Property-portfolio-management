export default function RentStatCard({
  value,
  label,
  valueClassName = 'text-black',
}) {
  return (
    <div
      className="w-full rounded-2xl bg-white px-5 py-4 flex flex-col justify-center"
      style={{
        boxShadow:
          '-2px -2px 4px 0px rgba(0, 0, 0, 0.25), 2px 2px 4px 0px rgba(0, 0, 0, 0.25)',
      }}
    >
      <span
        className={`text-3xl md:text-4xl font-medium leading-none ${valueClassName}`}
      >
        {value}
      </span>
      <span className="mt-1.5 text-[11px] text-gray-400">{label}</span>
    </div>
  )
}
