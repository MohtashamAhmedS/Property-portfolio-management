'use client'

import { useState } from 'react'
import DashboardHeader from './components/DashboardHeader'
import StatCard from './components/StatCard'
import PropertiesCarousel from './components/PropertiesCarousel'
import Image from 'next/image'
import TasksSection from './components/TasksSection'

export default function DashboardPage() {
  const [properties, setProperties] = useState([])

  // TEMPORARY: adds a demo property so you can preview the populated state.
  // Replace with the real "add a property" flow when we build it.
  const handleAddProperty = () => {
    setProperties((prev) => [
      ...prev,
      {
        id: Date.now(),
        address: 'AB avenue, AB city',
        rent: 1000,
        dueDate: 'Due 06 aug',
      },
    ])
  }

  const hasProperties = properties.length > 0
  const rentPending = properties.reduce((sum, p) => sum + p.rent, 0)

  // TEMPORARY: demo tasks, one rent task and one bill task per property.
  // These will come from real rent and bill data later.
  const tasks = properties.flatMap((property) => [
    {
      id: `rent-${property.id}`,
      type: 'rent',
      address: property.address,
      dueDate: property.dueDate,
    },
    {
      id: `bill-${property.id}`,
      type: 'bill',
      address: property.address,
      dueDate: property.dueDate,
    },
  ])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-black">
          Good Morning, Mike!
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={handleAddProperty}
            className="rounded-full bg-[#002C83] text-white text-sm font-medium px-5 py-2.5 hover:brightness-110 transition-all"
          >
            Add a property
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 relative">
            <Image
              src="/avatar-placeholder.png"
              alt="User avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {hasProperties ? (
        /* Populated state */
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-8 pt-6">
            <StatCard value={properties.length} label="properties" />
            <StatCard
              value={`$${rentPending}`}
              label="Rent pending this month"
            />
            <StatCard value="0" label="Bill due this week" />
          </div>

          <section className="px-8 pt-6 pb-8">
            <h2 className="text-xl font-medium text-black mb-3">Properties</h2>
            <PropertiesCarousel properties={properties} />
          </section>

          <TasksSection tasks={tasks} />
        </>
      ) : (
        /* Empty state */
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-semibold text-black">Add a property</h2>
          <button
            onClick={handleAddProperty}
            className="rounded-full bg-[#002C83] text-white text-sm font-medium px-6 py-3 hover:brightness-110 transition-all"
          >
            Add a property
          </button>
        </div>
      )}
    </div>
  )
}
