'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'
import { ensureMonthlyRents } from '../../lib/ensureMonthlyRents'
import StatCard from './components/StatCard'
import PropertiesCarousel from './components/PropertiesCarousel'
import TasksSection from './components/TasksSection'

// ---------- helpers ----------
const toDate = (s) => (s ? new Date(`${s}T00:00:00`) : null)

const fmtShort = (s) =>
  toDate(s).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })

const toISO = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`

function nextDueLabel(dueDay) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let d = new Date(today.getFullYear(), today.getMonth(), dueDay)
  if (d < today) d = new Date(today.getFullYear(), today.getMonth() + 1, dueDay)
  return `Due ${d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  })}`
}

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 18) return 'Good Afternoon'
  return 'Good Evening'
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [properties, setProperties] = useState([])
  const [tasks, setTasks] = useState([])
  const [billsDueThisWeek, setBillsDueThisWeek] = useState(0)

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const meta = user?.user_metadata ?? {}
      const fullName = meta.full_name || meta.name || user?.email || ''
      setFirstName(fullName.split(/[\s@]/)[0])

      // Make sure this month's rents exist before reading them
      await ensureMonthlyRents(supabase)

      const weekAhead = new Date()
      weekAhead.setDate(weekAhead.getDate() + 7)

      const [propsRes, rentsRes, billsRes] = await Promise.all([
        supabase
          .from('properties')
          .select('*, tenants(name), rents(status, due_date)')
          .order('created_at', { ascending: false }),
        supabase
          .from('rents')
          .select('id, due_date, status, properties(street, city)')
          .neq('status', 'paid')
          .order('due_date', { ascending: true }),
        supabase
          .from('bills')
          .select('id, title, due_date, status, properties(street, city)')
          .neq('status', 'paid')
          .order('due_date', { ascending: true }),
      ])

      if (propsRes.error) console.error(propsRes.error.message)

      const mapped = (propsRes.data ?? []).map((row) => {
        const hasTenant = (row.tenants ?? []).length > 0
        const latestRent = [...(row.rents ?? [])].sort((a, b) =>
          b.due_date.localeCompare(a.due_date),
        )[0]

        // rent counts as pending when someone lives there and it isn't paid
        const pending = hasTenant && latestRent?.status !== 'paid'
        const status = !hasTenant ? 'Vacant' : pending ? 'Pending' : 'Paid'
        const label = !hasTenant
          ? 'No Tenant'
          : pending
            ? 'Waiting for Rent'
            : 'Rent Received'

        return {
          id: row.id,
          address: `${row.street}, ${row.city}`,
          rent: Number(row.monthly_rent),
          dueDate: nextDueLabel(row.rent_due_day),
          photoUrl: row.photo_url,
          pending,
          status,
          label,
        }
      })

      const rentTasks = (rentsRes.data ?? []).map((r) => ({
        id: `rent-${r.id}`,
        type: 'rent',
        address: `${r.properties?.street}, ${r.properties?.city}`,
        dueDate: `Due ${fmtShort(r.due_date)}`,
      }))

      const billTasks = (billsRes.data ?? []).map((b) => ({
        id: `bill-${b.id}`,
        type: 'bill',
        address: `${b.properties?.street}, ${b.properties?.city}`,
        dueDate: `Due ${fmtShort(b.due_date)}`,
      }))

      const dueSoon = (billsRes.data ?? []).filter(
        (b) => b.due_date <= toISO(weekAhead),
      ).length

      setProperties(mapped)
      setTasks([...rentTasks, ...billTasks])
      setBillsDueThisWeek(dueSoon)
      setLoading(false)
    }
    load()
  }, [])

  const handleAddProperty = () => router.push('/dashboard/properties/new')

  const hasProperties = properties.length > 0
  const rentPending = properties
    .filter((p) => p.pending)
    .reduce((sum, p) => sum + p.rent, 0)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-black">
          {loading
            ? 'Welcome'
            : `${greeting()}${firstName ? `, ${firstName}` : ''}!`}
        </h1>

        <div className="flex items-center gap-4">
          {hasProperties && (
            <button
              onClick={handleAddProperty}
              className="rounded-full bg-[#002C83] text-white text-sm font-medium px-5 py-2.5 hover:brightness-110 transition-all"
            >
              Add a property
            </button>
          )}
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8B98F] text-sm font-medium text-[#5a3a1c]"
            style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.25)' }}
          >
            {firstName ? firstName.charAt(0).toUpperCase() : ''}
          </div>
        </div>
      </div>

      {loading ? (
        <p className="px-8 pt-6 text-sm text-gray-500">Loading...</p>
      ) : hasProperties ? (
        /* Populated state */
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-8 pt-6">
            <StatCard value={properties.length} label="properties" />
            <StatCard
              value={`$${rentPending.toLocaleString()}`}
              label="Rent pending this month"
            />
            <StatCard
              value={String(billsDueThisWeek)}
              label="Bill due this week"
            />
          </div>

          <section className="px-8 pt-6 pb-8">
            <h2 className="text-xl font-medium text-black mb-3">Properties</h2>
            <PropertiesCarousel properties={properties} />
          </section>

          {tasks.length > 0 && <TasksSection tasks={tasks} />}
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
