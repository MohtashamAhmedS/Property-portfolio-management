'use client'

import { useState } from 'react'
import Link from 'next/link'
import DashboardHeader from '../components/DashboardHeader'
import PropertyFilters from '../components/PropertyFilters'
import PropertyListingCard from '../components/PropertyListingCard'
import EmptyPropertiesState from '../components/EmptyPropertiesState'

// Maps the filter chip labels to the status values on each property
const STATUS_FILTERS = {
  'Rent pending': 'pending',
  Paid: 'paid',
  Vacant: 'vacant',
}

// TEMPORARY demo templates. Each "Add a property" click adds the next one.
// This will be replaced by the real add-property flow and database data.
const DEMO_TEMPLATES = [
  {
    street: 'AB avenue',
    city: 'AB city',
    tenant: 'M. John',
    rent: 1300,
    status: 'pending',
  },
  {
    street: 'CD street',
    city: 'CD city',
    tenant: 'S. Khan',
    rent: 1300,
    status: 'pending',
  },
  {
    street: 'EF road',
    city: 'EF city',
    tenant: 'A. Smith',
    rent: 1300,
    status: 'paid',
  },
  {
    street: 'GH lane',
    city: 'GH city',
    tenant: 'R. Patel',
    rent: 1300,
    status: 'paid',
  },
  {
    street: 'IJ boulevard',
    city: 'IJ city',
    tenant: null,
    rent: 1300,
    status: 'vacant',
  },
]

export default function PropertiesPage() {
  const [properties, setProperties] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const handleAddProperty = () => {
    setProperties((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...DEMO_TEMPLATES[prev.length % DEMO_TEMPLATES.length],
      },
    ])
  }

  const hasProperties = properties.length > 0

  const query = search.trim().toLowerCase()
  const visible = properties.filter((property) => {
    const matchesFilter =
      filter === 'All' || property.status === STATUS_FILTERS[filter]
    const matchesSearch =
      !query ||
      `${property.street} ${property.city}`.toLowerCase().includes(query)
    return matchesFilter && matchesSearch
  })

  const vacantCount = properties.filter((p) => p.status === 'vacant').length
  const rentPending = properties
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.rent, 0)

  const subtitle = hasProperties
    ? `${properties.length} properties - ${vacantCount} vacant - $${rentPending} pending this month`
    : undefined

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader
        title="Properties"
        subtitle={subtitle}
        onAddProperty={handleAddProperty}
      />

      {hasProperties ? (
        <>
          <PropertyFilters
            search={search}
            onSearchChange={setSearch}
            filter={filter}
            onFilterChange={setFilter}
          />

          <section className="px-8 pt-6 pb-8">
            {visible.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visible.map((property) => (
                  <Link
                    key={property.id}
                    href={`/dashboard/properties/${property.id}`}
                    className="block"
                  >
                    <PropertyListingCard {...property} />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-16">
                No properties match your search.
              </p>
            )}
          </section>
        </>
      ) : (
        <EmptyPropertiesState onAddProperty={handleAddProperty} />
      )}
    </div>
  )
}
