'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../../../lib/supabase/client'
import PropertyDetailHeader from '../../components/PropertyDetailHeader'
import PropertyOverview from '../../components/PropertyOverview'
import TenantRentSection from '../../components/TenantRentSection'
import PropertyBills from '../../components/PropertyBills'

// ---------- helpers ----------
const toDate = (s) => (s ? new Date(`${s}T00:00:00`) : null)

const fmtShort = (s) =>
  s
    ? toDate(s).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    : null

const fmtFull = (d) =>
  d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

const fmtMonthYear = (s) =>
  toDate(s).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '')

function nextDueDate(dueDay) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let d = new Date(today.getFullYear(), today.getMonth(), dueDay)
  if (d < today) d = new Date(today.getFullYear(), today.getMonth() + 1, dueDay)
  return fmtFull(d)
}

function monthsBetween(a, b) {
  return (
    (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
  )
}

function leaseInfo(tenant) {
  if (!tenant?.lease_start || !tenant?.lease_end) {
    return { term: '—', progress: 0, start: '—', end: '—' }
  }
  const start = toDate(tenant.lease_start)
  const end = toDate(tenant.lease_end)
  const total = end - start
  const done = Math.min(Math.max(Date.now() - start, 0), total)
  return {
    term: `${monthsBetween(start, end)} months`,
    progress: total > 0 ? Math.round((done / total) * 100) : 0,
    start: fmtFull(start),
    end: fmtFull(end),
  }
}

export default function PropertyDetailPage() {
  const { id } = useParams()
  const supabase = createClient()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: property } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (!property) {
        setNotFound(true)
        setLoading(false)
        return
      }

      const [tenantRes, rentsRes, billsRes] = await Promise.all([
        supabase
          .from('tenants')
          .select('*')
          .eq('property_id', id)
          .limit(1)
          .maybeSingle(),
        supabase
          .from('rents')
          .select('*')
          .eq('property_id', id)
          .order('due_date', { ascending: false })
          .limit(6),
        supabase
          .from('bills')
          .select('*')
          .eq('property_id', id)
          .order('due_date', { ascending: false }),
      ])

      setData({
        property,
        tenant: tenantRes.data,
        rents: rentsRes.data ?? [],
        bills: billsRes.data ?? [],
      })
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return <p className="p-10 text-sm text-gray-500">Loading...</p>
  }

  if (notFound) {
    return (
      <div className="p-10">
        <p className="text-sm text-gray-600">Property not found.</p>
        <Link
          href="/dashboard/properties"
          className="mt-3 inline-block text-sm font-medium text-[#002C83]"
        >
          Back to properties
        </Link>
      </div>
    )
  }

  const { property, tenant, rents, bills } = data
  const lease = leaseInfo(tenant)
  const lastPaid = rents.find((r) => r.status === 'paid')

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <PropertyDetailHeader
        id={property.id}
        name={property.street}
        city={property.city}
        type={property.type}
      />

      <PropertyOverview
        photoUrl={property.photo_url}
        status={rents[0]?.status ?? 'pending'}
        bedrooms={property.bedrooms ?? 0}
        bathrooms={property.bathrooms ?? 0}
        floorArea={property.floor_area ?? 0}
        yearBuilt={property.year_built ?? '—'}
        rent={Number(property.monthly_rent)}
        nextDue={nextDueDate(property.rent_due_day)}
        lastPayment={
          lastPaid
            ? `$${Number(lastPaid.amount).toLocaleString()} on ${fmtShort(
                lastPaid.paid_on,
              )}`
            : '—'
        }
      />

      <TenantRentSection
        tenant={{
          name: tenant?.name ?? 'No tenant yet',
          since: tenant?.lease_start
            ? toDate(tenant.lease_start).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })
            : '—',
          phone: tenant?.phone ?? '—',
          email: tenant?.email ?? '—',
          deposit: Number(property.deposit ?? 0),
          leaseTerm: lease.term,
          leaseStart: lease.start,
          leaseEnd: lease.end,
          leaseProgress: lease.progress,
        }}
        history={rents.map((r) => ({
          month: fmtMonthYear(r.due_date),
          amount: Number(r.amount),
          paidOn: r.paid_on ? fmtShort(r.paid_on) : null,
          status: cap(r.status),
        }))}
      />

      <PropertyBills
        bills={bills.map((b) => ({
          id: b.id,
          name: b.title,
          note:
            b.status === 'paid'
              ? `Paid ${fmtShort(b.paid_on)}`
              : `Due ${fmtShort(b.due_date)}`,
          icon: /insur/i.test(b.title) ? 'shield' : 'water',
          amount: Number(b.amount),
          status: cap(b.status),
        }))}
      />
    </div>
  )
}
