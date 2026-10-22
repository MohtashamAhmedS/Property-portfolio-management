'use client'

const FILTERS = ['All', 'Rent pending', 'Paid', 'Vacant']

const SHADOW =
  '-2px -2px 4px 0px rgba(0, 0, 0, 0.25), 2px 2px 4px 0px rgba(0, 0, 0, 0.25)'

export default function PropertyFilters({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 px-8 pt-6">
      {/* Search */}
      <label className="relative flex-1">
        <span className="sr-only">Search properties</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by address & city"
          className="w-full h-[38px] rounded-xl bg-white pl-9 pr-4 text-sm text-black placeholder:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002C83]/40"
          style={{ boxShadow: SHADOW }}
        />
      </label>

      {/* Filter chips */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter properties"
      >
        {FILTERS.map((item) => {
          const isActive = filter === item
          return (
            <button
              key={item}
              type="button"
              onClick={() => onFilterChange(item)}
              aria-pressed={isActive}
              className={`h-[38px] rounded-xl px-4 text-sm whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002C83]/40 ${
                isActive
                  ? 'bg-[#002C83] text-white'
                  : 'bg-white text-black hover:bg-gray-50'
              }`}
              style={{ boxShadow: SHADOW }}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}
