'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'
import DashboardHeader from '../components/DashboardHeader'
import RentStatCard from '../components/RentStatCard'
import RentsTable from '../components/RentsTable'

const toISO = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`

const fmtDue = (s) =>
  new Date(`${s}T00:00:00`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  })

export default function RentsPage() {
  const router = useRouter()
  const supabase = createClient()

  const [rents, setRents] = useState([])
  const [tenantCount, setTenantCount] = useState(0)
  const [month, setMonth] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMonth(
      new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    )

    async function load() {
      const [rentsRes, tenantsRes] = await Promise.all([
        supabase
          .from('rents')
          .select('*, properties(street, city, tenants(name))')
          .order('due_date', { ascending: false }),
        supabase.from('tenants').select('id', { count: 'exact', head: true }),
      ])

      if (rentsRes.error) console.error(rentsRes.error.message)
      setRents(rentsRes.data ?? [])
      setTenantCount(tenantsRes.count ?? 0)
      setLoading(false)
    }
    load()
  }, [])

  const handleMarkPaid = async (id) => {
    const paidOn = toISO(new Date())
    const { error } = await supabase
      .from('rents')
      .update({ status: 'paid', paid_on: paidOn })
      .eq('id', id)

    if (error) {
      console.error('Mark paid failed:', error.message)
      return
    }
    setRents((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'paid', paid_on: paidOn } : r,
      ),
    )
  }

  // ---- work out status + stats ----
  const today = toISO(new Date())
  const monthKey = today.slice(0, 7)

  const rows = rents.map((r) => {
    const status =
      r.status === 'paid' ? 'Paid' : r.due_date < today ? 'Overdue' : 'Pending'

    return {
      id: r.id,
      property: r.properties?.street ?? '—',
      tenant: r.properties?.tenants?.[0]?.name ?? '—',
      amount: Number(r.amount),
      due: fmtDue(r.due_date),
      dueDate: r.due_date,
      status,
      paidOn: r.paid_on ? fmtDue(r.paid_on) : null,
    }
  })

  const sum = (list) => list.reduce((total, r) => total + r.amount, 0)
  const thisMonth = rows.filter((r) => r.dueDate.startsWith(monthKey))

  const stats = {
    expected: sum(thisMonth),
    pending: sum(thisMonth.filter((r) => r.status === 'Pending')),
    collected: sum(thisMonth.filter((r) => r.status === 'Paid')),
    overdue: sum(rows.filter((r) => r.status === 'Overdue')),
  }

  const subtitle = month
    ? `${tenantCount} tenants - ${month}`
    : `${tenantCount} tenants`

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader
        title="Rents"
        subtitle={subtitle}
        buttonLabel="Add rent"
        onAddProperty={() => router.push('/dashboard/rents/new')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 pt-6">
        <RentStatCard
          value={`$${stats.expected.toLocaleString()}`}
          label="Rent expected this month"
        />
        <RentStatCard
          value={`$${stats.pending.toLocaleString()}`}
          label="Rent pending this month"
          valueClassName="text-[#C9822B]"
        />
        <RentStatCard
          value={`$${stats.collected.toLocaleString()}`}
          label="Collected"
          valueClassName="text-[#2F8A6F]"
        />
        <RentStatCard
          value={`$${stats.overdue.toLocaleString()}`}
          label="Overdue"
          valueClassName="text-[#C24B4B]"
        />
      </div>

      <RentsTable rents={rows} loading={loading} onMarkPaid={handleMarkPaid} />
    </div>
  )
}
