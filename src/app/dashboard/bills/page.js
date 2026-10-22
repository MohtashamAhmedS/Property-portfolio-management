'use client'

import { useEffect, useState } from 'react'
import DashboardHeader from '../components/DashboardHeader'
import RentStatCard from '../components/RentStatCard'
import BillsList from '../components/BillsList'

const BILL_COUNT = 5

const BILL_STATS = {
  total: 1240,
  paid: 640,
  upcoming: 420,
  overdue: 180,
}

export default function BillsPage() {
  const [month, setMonth] = useState('')

  useEffect(() => {
    setMonth(
      new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    )
  }, [])

  const subtitle = `${BILL_COUNT} bills${month ? ` - ${month}` : ''}`

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <DashboardHeader
        title="Bills"
        subtitle={subtitle}
        buttonLabel="Add bill"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 pt-6">
        <RentStatCard value={`$${BILL_STATS.total}`} label="Total this month" />
        <RentStatCard
          value={`$${BILL_STATS.paid}`}
          label="Paid"
          valueClassName="text-[#C9822B]"
        />
        <RentStatCard
          value={`$${BILL_STATS.upcoming}`}
          label="Upcoming"
          valueClassName="text-[#2F8A6F]"
        />
        <RentStatCard
          value={`$${BILL_STATS.overdue}`}
          label="Overdue"
          valueClassName="text-[#C24B4B]"
        />
      </div>

      {/* Filters + bills list go here */}
      <BillsList />
    </div>
  )
}
