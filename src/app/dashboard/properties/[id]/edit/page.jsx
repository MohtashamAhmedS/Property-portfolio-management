'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '../../../../../lib/supabase/client'
import FormPageHeader from '../../../components/FormPageHeader'
import AddPropertyForm from '../../../components/AddPropertyForm'

export default function EditPropertyPage() {
  const { id } = useParams()
  const supabase = createClient()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: property } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      const { data: tenant } = await supabase
        .from('tenants')
        .select('*')
        .eq('property_id', id)
        .limit(1)
        .maybeSingle()

      setData(property ? { property, tenant } : null)
      setLoading(false)
    }
    load()
  }, [id])

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <FormPageHeader
        backHref={`/dashboard/properties/${id}`}
        backLabel="Back to property"
        title="Edit property"
        subtitle="Update the details and save."
      />

      {loading ? (
        <p className="px-8 pt-6 text-sm text-gray-500">Loading...</p>
      ) : data ? (
        <AddPropertyForm property={data.property} tenant={data.tenant} />
      ) : (
        <p className="px-8 pt-6 text-sm text-gray-500">Property not found.</p>
      )}
    </div>
  )
}
