'use client'

import { useEffect, useRef, useState } from 'react'
import PropertyCard from './PropertyCard'

export default function PropertiesCarousel({ properties }) {
  const trackRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const showArrows = properties.length > 3

  const updateEdges = () => {
    const track = trackRef.current
    if (!track) return
    setAtStart(track.scrollLeft <= 4)
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4)
  }

  useEffect(() => {
    updateEdges()
    window.addEventListener('resize', updateEdges)
    return () => window.removeEventListener('resize', updateEdges)
  }, [properties.length])

  // Scroll by exactly one card (card width + the 16px gap)
  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild
    const amount = card
      ? card.getBoundingClientRect().width + 16
      : track.clientWidth
    track.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={updateEdges}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {properties.map((property) => (
          <div
            key={property.id}
            className="snap-start shrink-0 w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            <PropertyCard address={property.address} date={property.dueDate} />
          </div>
        ))}
      </div>

      {showArrows && !atStart && (
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous properties"
          className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#002C83] hover:bg-gray-50 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>
      )}

      {showArrows && !atEnd && (
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next properties"
          className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#002C83] hover:bg-gray-50 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  )
}
