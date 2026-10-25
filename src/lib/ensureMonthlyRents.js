const pad = (n) => String(n).padStart(2, '0')

// Creates this month's rent for every property that has a tenant
// and doesn't have a rent for this month yet.
export async function ensureMonthlyRents(supabase) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const start = `${year}-${pad(month + 1)}-01`
  const end = `${year}-${pad(month + 1)}-${pad(
    new Date(year, month + 1, 0).getDate(),
  )}`

  const [propsRes, existingRes] = await Promise.all([
    supabase
      .from('properties')
      .select('id, monthly_rent, rent_due_day, tenants(id)'),
    supabase
      .from('rents')
      .select('property_id')
      .gte('due_date', start)
      .lte('due_date', end),
  ])

  const hasRent = new Set((existingRes.data ?? []).map((r) => r.property_id))

  const rows = (propsRes.data ?? [])
    .filter(
      (p) =>
        Number(p.monthly_rent) > 0 &&
        (p.tenants ?? []).length > 0 &&
        !hasRent.has(p.id),
    )
    .map((p) => ({
      property_id: p.id,
      due_date: `${year}-${pad(month + 1)}-${pad(p.rent_due_day || 1)}`,
      amount: Number(p.monthly_rent),
      status: 'pending',
    }))

  if (rows.length === 0) return

  const { error } = await supabase
    .from('rents')
    .upsert(rows, {
      onConflict: 'property_id,due_date',
      ignoreDuplicates: true,
    })

  if (error) console.error('Auto-create rents failed:', error.message)
}
