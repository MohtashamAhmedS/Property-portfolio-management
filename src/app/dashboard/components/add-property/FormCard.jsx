export default function FormCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-medium text-black">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  )
}
