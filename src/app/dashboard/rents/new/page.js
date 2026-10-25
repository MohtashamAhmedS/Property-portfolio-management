'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../../../lib/supabase/client'
import FormPageHeader from '../../components/FormPageHeader'
import FormCard from '../../components/add-property/FormCard'
import FormField, { INPUT_CLASS } from '../../components/add-property/FormField'

const toISO = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function AddRentPage() {
  const router = useRouter()
  const supabase = createClient()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    propertyId: '',
    dueDate: '',
    amount: '',
    status: 'pending',
    paidOn: toISO(new Date()),
  })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('properties')
        .select('id, street, city, monthly_rent')
        .order('created_at', { ascending: false })
      setProperties(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const set = (field) => (e) => {
    const value = e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  // Picking a property fills in its monthly rent
  const handlePropertyChange = (e) => {
    const propertyId = e.target.value
    const chosen = properties.find((p) => p.id === propertyId)
    setForm((prev) => ({
      ...prev,
      propertyId,
      amount: chosen ? String(chosen.monthly_rent) : prev.amount,
    }))
    if (errors.propertyId)
      setErrors((prev) => ({ ...prev, propertyId: undefined }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (saving) return

    const next = {}
    if (!form.propertyId) next.propertyId = 'Choose a property.'
    if (!form.dueDate) next.dueDate = 'Choose a due date.'
    if (!form.amount || Number(form.amount) <= 0)
      next.amount = 'Enter the rent amount.'
    if (form.status === 'paid' && !form.paidOn)
      next.paidOn = 'Choose the payment date.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSaving(true)
    setSubmitError('')

    const { error } = await supabase.from('rents').insert({
      property_id: form.propertyId,
      due_date: form.dueDate,
      amount: Number(form.amount),
      status: form.status,
      paid_on: form.status === 'paid' ? form.paidOn : null,
    })

    if (error) {
      setSubmitError(error.message)
      setSaving(false)
      return
    }

    router.push('/dashboard/rents')
    router.refresh()
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <FormPageHeader
        backHref="/dashboard/rents"
        backLabel="Back to rents"
        title="Add rent"
        subtitle="Record a rent payment that is due or already paid."
      />

      {loading ? (
        <p className="px-8 pt-6 text-sm text-gray-500">Loading...</p>
      ) : properties.length === 0 ? (
        <div className="px-8 pt-6">
          <p className="text-sm text-gray-600">
            You need a property before you can add rent.
          </p>
          <Link
            href="/dashboard/properties/new"
            className="mt-3 inline-block text-sm font-medium text-[#002C83]"
          >
            Add a property
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSave}
          noValidate
          className="flex max-w-2xl flex-col gap-5 px-8 pt-6 pb-10"
        >
          {submitError && (
            <p className="rounded-xl bg-[#C24B4B]/15 px-4 py-3 text-sm text-[#C24B4B]">
              {submitError}
            </p>
          )}

          <FormCard
            title="Rent details"
            subtitle="Which property and how much."
          >
            <div className="flex flex-col gap-4">
              <FormField label="Property" error={errors.propertyId}>
                <div className="relative">
                  <select
                    value={form.propertyId}
                    onChange={handlePropertyChange}
                    className={`${INPUT_CLASS} appearance-none bg-white pr-10 ${
                      errors.propertyId ? 'border-[#C24B4B]' : ''
                    }`}
                  >
                    <option value="">Select a property</option>
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.street}, {p.city}
                      </option>
                    ))}
                  </select>
                  <Chevron />
                </div>
              </FormField>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Due date" error={errors.dueDate}>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={set('dueDate')}
                    className={`${INPUT_CLASS} ${
                      errors.dueDate ? 'border-[#C24B4B]' : ''
                    }`}
                  />
                </FormField>

                <FormField label="Amount" error={errors.amount}>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={form.amount}
                      onChange={set('amount')}
                      placeholder="1,200"
                      className={`${INPUT_CLASS} pl-9 ${
                        errors.amount ? 'border-[#C24B4B]' : ''
                      }`}
                    />
                  </div>
                </FormField>
              </div>
            </div>
          </FormCard>

          <FormCard title="Status" subtitle="Has this rent been paid yet?">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Status">
                <div className="relative">
                  <select
                    value={form.status}
                    onChange={set('status')}
                    className={`${INPUT_CLASS} appearance-none bg-white pr-10`}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                  <Chevron />
                </div>
              </FormField>

              {form.status === 'paid' && (
                <FormField label="Paid on" error={errors.paidOn}>
                  <input
                    type="date"
                    value={form.paidOn}
                    onChange={set('paidOn')}
                    className={`${INPUT_CLASS} ${
                      errors.paidOn ? 'border-[#C24B4B]' : ''
                    }`}
                  />
                </FormField>
              )}
            </div>
          </FormCard>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-[#002C83] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ boxShadow: '4px 2px 4px rgba(0,0,0,0.25)' }}
            >
              {saving ? 'Saving...' : 'Save rent'}
            </button>
            <Link
              href="/dashboard/rents"
              className="rounded-xl px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}
