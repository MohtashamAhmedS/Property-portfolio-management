'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'
import DashboardHeader from '../components/DashboardHeader'
import RentStatCard from '../components/RentStatCard'
import BillsList from '../components/BillsList'

const CATEGORY_ICONS = {
  electricity: 'bolt',
  water: 'water',
  internet: 'wifi',
  tax: 'home',
  insurance: 'shield',
  maintenance: 'wrench',
  other: 'home',
}

const toISO = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`

const fmtShort = (s) =>
  new Date(`${s}T00:00:00`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  })

function relLabel(dueDate, status, paidOn) {
  if (status === 'Paid') return paidOn ? `Paid ${fmtShort(paidOn)}` : 'Paid'
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(`${dueDate}T00:00:00`)
  const diff = Math.round((due - today) / 86400000)
  if (diff < 0) return `${-diff} day${diff === -1 ? '' : 's'} overdue`
  if (diff === 0) return 'Due today'
  if (diff === 1) return 'Due tomorrow'
  return `In ${diff} days`
}

export default function BillsPage() {
  const router = useRouter()
  const supabase = createClient()

  const [bills, setBills] = useState([])
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
      const { data, error } = await supabase
        .from('bills')
        .select('*, properties(street, city)')
        .order('due_date', { ascending: true })

      if (error) console.error(error.message)
      setBills(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const handleMarkPaid = async (id) => {
    const paidOn = toISO(new Date())
    const { error } = await supabase
      .from('bills')
      .update({ status: 'paid', paid_on: paidOn })
      .eq('id', id)

    if (error) {
      console.error('Mark paid failed:', error.message)
      return
    }
    setBills((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: 'paid', paid_on: paidOn } : b,
      ),
    )
  }

  // ---- work out status + stats ----
  const today = toISO(new Date())
  const monthKey = today.slice(0, 7)

  const rows = bills.map((b) => {
    const status =
      b.status === 'paid' ? 'Paid' : b.due_date < today ? 'Overdue' : 'Upcoming'

    return {
      id: b.id,
      name: b.title,
      note: b.note || '',
      icon: CATEGORY_ICONS[b.category] ?? 'home',
      place: b.properties
        ? `${b.properties.street}, ${b.properties.city}`
        : '—',
      due: fmtShort(b.due_date),
      dueDate: b.due_date,
      rel: relLabel(b.due_date, status, b.paid_on),
      amount: Number(b.amount),
      status,
    }
  })

  const sum = (list) => list.reduce((total, r) => total + r.amount, 0)
  const thisMonth = rows.filter((r) => r.dueDate.startsWith(monthKey))

  const stats = {
    total: sum(thisMonth),
    paid: sum(thisMonth.filter((r) => r.status === 'Paid')),
    upcoming: sum(thisMonth.filter((r) => r.status === 'Upcoming')),
    overdue: sum(rows.filter((r) => r.status === 'Overdue')),
  }

  const subtitle = `${bills.length} bills${month ? ` - ${month}` : ''}`

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <DashboardHeader
        title="Bills"
        subtitle={subtitle}
        buttonLabel="Add bill"
        onAddProperty={() => router.push('/dashboard/bills/new')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 pt-6">
        <RentStatCard
          value={`$${stats.total.toLocaleString()}`}
          label="Total this month"
        />
        <RentStatCard
          value={`$${stats.paid.toLocaleString()}`}
          label="Paid"
          valueClassName="text-[#2F8A6F]"
        />
        <RentStatCard
          value={`$${stats.upcoming.toLocaleString()}`}
          label="Upcoming"
          valueClassName="text-[#C9822B]"
        />
        <RentStatCard
          value={`$${stats.overdue.toLocaleString()}`}
          label="Overdue"
          valueClassName="text-[#C24B4B]"
        />
      </div>

      <BillsList bills={rows} loading={loading} onMarkPaid={handleMarkPaid} />
    </div>
  )
}
