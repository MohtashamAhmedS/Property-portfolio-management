'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'
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

// Turn a database row into what the listing card expects
function toCardProperty(row) {
  const tenant = row.tenants?.[0]?.name ?? null

  // Newest rent record decides the status
  const latestRent = [...(row.rents ?? [])].sort((a, b) =>
    b.due_date.localeCompare(a.due_date),
  )[0]

  let status = 'pending'
  if (!tenant) status = 'vacant'
  else if (latestRent?.status === 'paid') status = 'paid'

  return {
    id: row.id,
    street: row.street,
    city: row.city,
    tenant,
    rent: Number(row.monthly_rent),
    status,
    photoUrl: row.photo_url,
  }
}

export default function PropertiesPage() {
  const router = useRouter()
  const supabase = createClient()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('properties')
        .select('*, tenants(name), rents(status, due_date)')
        .order('created_at', { ascending: false })

      if (error) console.error('Load properties failed:', error.message)
      setProperties((data ?? []).map(toCardProperty))
      setLoading(false)
    }
    load()
  }, [])

  const handleAddProperty = () => router.push('/dashboard/properties/new')

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
    ? `${properties.length} properties - ${vacantCount} vacant - $${rentPending.toLocaleString()} pending this month`
    : undefined

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader
        title="Properties"
        subtitle={subtitle}
        onAddProperty={handleAddProperty}
      />

      {loading ? (
        <p className="px-8 pt-6 text-sm text-gray-500">Loading...</p>
      ) : hasProperties ? (
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
