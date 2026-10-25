'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'
import LocationSection from './add-property/LocationSection'
import PropertyDetailsSection from './add-property/PropertyDetailsSection'
import RentSection from './add-property/RentSection'
import TenantSection from './add-property/TenantSection'
import PhotoUpload from './add-property/PhotoUpload'
import SummaryCard from './add-property/SummaryCard'

// '' -> null, otherwise a number
const toNumber = (v) => (v === '' || v === null ? null : Number(v))

// Pass `property` (and `tenant`) to edit; leave them out to add
export default function AddPropertyForm({ property = null, tenant = null }) {
  const router = useRouter()
  const supabase = createClient()
  const isEdit = Boolean(property)

  const [form, setForm] = useState({
    street: property?.street ?? '',
    city: property?.city ?? '',
    state: property?.state ?? '',
    postal: property?.postal ?? '',
    country: property?.country ?? 'United States',
    type: property?.type ?? 'House',
    bedrooms: property?.bedrooms ?? '',
    bathrooms: property?.bathrooms ?? '',
    floorArea: property?.floor_area ?? '',
    yearBuilt: property?.year_built ?? '',
    rent: property?.monthly_rent ?? '',
    dueDay: String(property?.rent_due_day ?? 6),
    deposit: property?.deposit ?? '',
    tenantName: tenant?.name ?? '',
    tenantEmail: tenant?.email ?? '',
    tenantPhone: tenant?.phone ?? '',
    leaseStart: tenant?.lease_start ?? '',
    leaseEnd: tenant?.lease_end ?? '',
  })
  const [photo, setPhoto] = useState(
    property?.photo_url ? { file: null, url: property.photo_url } : null,
  ) // { file, url }
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleTypeChange = (type) => setForm((prev) => ({ ...prev, type }))

  const handleSave = async (e) => {
    e.preventDefault()
    if (saving) return

    const next = {}
    if (!form.street.trim()) next.street = 'Enter the street address.'
    if (!form.city.trim()) next.city = 'Enter the city.'
    if (form.leaseStart && form.leaseEnd && form.leaseEnd <= form.leaseStart) {
      next.leaseEnd = 'Lease end must be after the start.'
    }
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSaving(true)
    setSubmitError('')

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    const fields = {
      street: form.street.trim(),
      city: form.city.trim(),
      state: form.state.trim() || null,
      postal: form.postal.trim() || null,
      country: form.country,
      type: form.type,
      bedrooms: toNumber(form.bedrooms),
      bathrooms: toNumber(form.bathrooms),
      floor_area: toNumber(form.floorArea),
      year_built: toNumber(form.yearBuilt),
      monthly_rent: toNumber(form.rent) ?? 0,
      rent_due_day: toNumber(form.dueDay) ?? 1,
      deposit: toNumber(form.deposit),
    }

    // 1. Save the property (update or insert)
    let saved
    if (isEdit) {
      const { data, error } = await supabase
        .from('properties')
        .update(fields)
        .eq('id', property.id)
        .select()
        .single()
      if (error) {
        setSubmitError(error.message)
        setSaving(false)
        return
      }
      saved = data
    } else {
      const { data, error } = await supabase
        .from('properties')
        .insert({ owner_id: user.id, ...fields })
        .select()
        .single()
      if (error) {
        setSubmitError(error.message)
        setSaving(false)
        return
      }
      saved = data
    }

    // 2. Photo
    if (photo?.file) {
      // New photo picked: upload it
      const ext = photo.file.type === 'image/png' ? 'png' : 'jpg'
      const path = `${user.id}/${saved.id}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('property-photos')
        .upload(path, photo.file, {
          contentType: photo.file.type,
          upsert: true,
        })

      if (uploadError) {
        console.error('Photo upload failed:', uploadError.message)
      } else {
        const { data } = supabase.storage
          .from('property-photos')
          .getPublicUrl(path)

        await supabase
          .from('properties')
          .update({ photo_url: `${data.publicUrl}?v=${Date.now()}` })
          .eq('id', saved.id)
      }
    } else if (isEdit && !photo && property.photo_url) {
      // Photo was removed
      await supabase
        .from('properties')
        .update({ photo_url: null })
        .eq('id', saved.id)
    }

    // 3. Tenant
    const tenantFields = {
      name: form.tenantName.trim(),
      email: form.tenantEmail.trim() || null,
      phone: form.tenantPhone.trim() || null,
      lease_start: form.leaseStart || null,
      lease_end: form.leaseEnd || null,
    }

    if (tenant) {
      if (tenantFields.name) {
        const { error } = await supabase
          .from('tenants')
          .update(tenantFields)
          .eq('id', tenant.id)
        if (error) console.error('Tenant update failed:', error.message)
      } else {
        // Name cleared: property becomes vacant
        await supabase.from('tenants').delete().eq('id', tenant.id)
      }
    } else if (tenantFields.name) {
      const { error } = await supabase
        .from('tenants')
        .insert({ property_id: saved.id, ...tenantFields })
      if (error) console.error('Tenant save failed:', error.message)
    }

    router.push(
      isEdit ? `/dashboard/properties/${saved.id}` : '/dashboard/properties',
    )
    router.refresh()
  }

  const address = [form.street.trim(), form.city.trim()]
    .filter(Boolean)
    .join(', ')

  const rentLabel = form.rent ? `$${Number(form.rent).toLocaleString()}` : ''

  return (
    <form
      onSubmit={handleSave}
      noValidate
      className="grid grid-cols-1 gap-5 px-8 pt-6 pb-10 lg:grid-cols-[minmax(0,1fr)_340px]"
    >
      <div className="flex flex-col gap-5">
        {submitError && (
          <p className="rounded-xl bg-[#C24B4B]/15 px-4 py-3 text-sm text-[#C24B4B]">
            {submitError}
          </p>
        )}
        <LocationSection form={form} errors={errors} update={update} />
        <PropertyDetailsSection
          form={form}
          update={update}
          onTypeChange={handleTypeChange}
        />
        <RentSection form={form} update={update} />
        <TenantSection form={form} errors={errors} update={update} />
      </div>

      <div className="flex flex-col gap-5">
        <PhotoUpload photo={photo} onPhotoChange={setPhoto} />
        <SummaryCard
          address={address}
          type={form.type}
          rent={rentLabel}
          tenant={form.tenantName.trim()}
        />
      </div>
    </form>
  )
}
