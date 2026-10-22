'use client'

import { useEffect, useState } from 'react'
import DashboardHeader from '../components/DashboardHeader'
import RentStatCard from '../components/RentStatCard'
import RentsTable from '../components/RentsTable'
// TEMPORARY demo values. These will be calculated from real rent data later.
const TENANT_COUNT = 5
const RENT_STATS = {
  expected: 6300,
  pending: 2600,
  collected: 3200,
  overdue: 900,
}

export default function RentsPage() {
  // Month is set after mount so the server and browser always agree
  const [month, setMonth] = useState('')

  useEffect(() => {
    setMonth(
      new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    )
  }, [])

  const subtitle = month
    ? `${TENANT_COUNT} tenants - ${month}`
    : `${TENANT_COUNT} tenants`

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader
        title="Rents"
        subtitle={subtitle}
        buttonLabel="Add rent"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 pt-6">
        <RentStatCard
          value={`$${RENT_STATS.expected}`}
          label="Rent expected this month"
        />
        <RentStatCard
          value={`$${RENT_STATS.pending}`}
          label="Rent pending this month"
          valueClassName="text-[#C9822B]"
        />
        <RentStatCard
          value={`$${RENT_STATS.collected}`}
          label="Collected"
          valueClassName="text-[#2F8A6F]"
        />
        <RentStatCard
          value={`$${RENT_STATS.overdue}`}
          label="Overdue"
          valueClassName="text-[#C24B4B]"
        />
      </div>
      <RentsTable />
    </div>
  )
}
