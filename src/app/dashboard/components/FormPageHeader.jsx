import Link from 'next/link'

export default function FormPageHeader({
  backHref,
  backLabel,
  title,
  subtitle,
}) {
  return (
    <div className="px-8 pt-5">
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          className="flex items-center gap-2 text-xs text-gray-600 transition-colors hover:text-[#002C83]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {backLabel}
        </Link>

        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8B98F] text-xs font-medium text-[#5a3a1c]"
          style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.25)' }}
        >
          M
        </div>
      </div>

      <h1 className="mt-5 text-3xl font-medium leading-tight text-black md:text-4xl">
        {title}
      </h1>
      {subtitle && <p className="mt-1.5 text-sm text-gray-500">{subtitle}</p>}
    </div>
  )
}
