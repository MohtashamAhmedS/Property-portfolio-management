'use client'

import Image from 'next/image'

export default function DashboardHeader({
  title,
  subtitle,
  onAddProperty,
  buttonLabel = 'Add a property',
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-8 py-6 border-b border-gray-100">
      <div className="min-w-0">
        <h1 className="text-3xl md:text-4xl font-normal text-black leading-tight font-semibold">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button
          type="button"
          onClick={onAddProperty}
          className="h-[38px] rounded-xl bg-[#002C83] text-white text-sm font-medium px-4 shadow-[4px_2px_4px_rgba(0,0,0,0.25)] hover:brightness-110 active:translate-y-px transition-all"
        >
          {buttonLabel}
        </button>

        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 relative shrink-0">
          <Image
            src="/avatar-placeholder.png"
            alt="User avatar"
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
