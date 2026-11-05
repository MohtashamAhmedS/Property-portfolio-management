'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../../../lib/supabase/client'
import FormPageHeader from '../../components/FormPageHeader'
import FormCard from '../../components/add-property/FormCard'
import FormField, { INPUT_CLASS } from '../../components/add-property/FormField'

const CATEGORIES = [
  { value: 'electricity', label: 'Electricity' },
  { value: 'water', label: 'Water' },
  { value: 'internet', label: 'Internet' },
  { value: 'tax', label: 'Property tax' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'other', label: 'Other' },
]

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

export default function AddBillPage() {
  const router = useRouter()
  const supabase = createClient()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    propertyId: '',
    category: 'electricity',
    title: '',
    note: '',
    dueDate: '',
    amount: '',
    status: 'upcoming',
    paidOn: toISO(new Date()),
  })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('properties')
        .select('id, street, city')
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

  const handleSave = async (e) => {
    e.preventDefault()
    if (saving) return

    const categoryLabel =
      CATEGORIES.find((c) => c.value === form.category)?.label ?? 'Bill'
    const title = form.title.trim() || categoryLabel

    const next = {}
    if (!form.propertyId) next.propertyId = 'Choose a property.'
    if (!form.dueDate) next.dueDate = 'Choose a due date.'
    if (!form.amount || Number(form.amount) <= 0)
      next.amount = 'Enter the bill amount.'
    if (form.status === 'paid' && !form.paidOn)
      next.paidOn = 'Choose the payment date.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSaving(true)
    setSubmitError('')

    const { error } = await supabase.from('bills').insert({
      property_id: form.propertyId,
      title,
      category: form.category,
      note: form.note.trim() || null,
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

    router.push('/dashboard/bills')
    router.refresh()
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <FormPageHeader
        backHref="/dashboard/bills"
        backLabel="Back to bills"
        title="Add bill"
        subtitle="Record a bill that is due or already paid."
      />

      {loading ? (
        <p className="px-8 pt-6 text-sm text-gray-500">Loading...</p>
      ) : properties.length === 0 ? (
        <div className="px-8 pt-6">
          <p className="text-sm text-gray-600">
            You need a property before you can add a bill.
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

          <FormCard title="Bill details" subtitle="What the bill is for.">
            <div className="flex flex-col gap-4">
              <FormField label="Property" error={errors.propertyId}>
                <div className="relative">
                  <select
                    value={form.propertyId}
                    onChange={set('propertyId')}
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
                <FormField label="Category">
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={set('category')}
                      className={`${INPUT_CLASS} appearance-none bg-white pr-10`}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <Chevron />
                  </div>
                </FormField>

                <FormField label="Title" optional>
                  <input
                    type="text"
                    value={form.title}
                    onChange={set('title')}
                    placeholder="Defaults to the category"
                    className={INPUT_CLASS}
                  />
                </FormField>
              </div>

              <FormField label="Note" optional>
                <input
                  type="text"
                  value={form.note}
                  onChange={set('note')}
                  placeholder="Monthly utility"
                  className={INPUT_CLASS}
                />
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
                      placeholder="180"
                      className={`${INPUT_CLASS} pl-9 ${
                        errors.amount ? 'border-[#C24B4B]' : ''
                      }`}
                    />
                  </div>
                </FormField>
              </div>
            </div>
          </FormCard>

          <FormCard title="Status" subtitle="Has this bill been paid yet?">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Status">
                <div className="relative">
                  <select
                    value={form.status}
                    onChange={set('status')}
                    className={`${INPUT_CLASS} appearance-none bg-white pr-10`}
                  >
                    <option value="upcoming">Pending</option>
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
              {saving ? 'Saving...' : 'Save bill'}
            </button>
            <Link
              href="/dashboard/bills"
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
