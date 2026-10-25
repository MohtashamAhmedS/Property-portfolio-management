import FormCard from './FormCard'
import FormField, { INPUT_CLASS } from './FormField'

export default function TenantSection({ form, errors, update }) {
  return (
    <FormCard
      title="Tenant"
      subtitle="Leave this empty if the property is vacant. You can add a tenant later."
    >
      <div className="flex flex-col gap-4">
        <FormField label="Full name">
          <input
            type="text"
            value={form.tenantName}
            onChange={update('tenantName')}
            placeholder="James Carter"
            className={INPUT_CLASS}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Email">
            <input
              type="email"
              value={form.tenantEmail}
              onChange={update('tenantEmail')}
              placeholder="name@example.com"
              className={INPUT_CLASS}
            />
          </FormField>

          <FormField label="Phone">
            <input
              type="tel"
              value={form.tenantPhone}
              onChange={update('tenantPhone')}
              placeholder="+1 555 014 2290"
              className={INPUT_CLASS}
            />
          </FormField>

          <FormField label="Lease start">
            <input
              type="date"
              value={form.leaseStart}
              onChange={update('leaseStart')}
              className={INPUT_CLASS}
            />
          </FormField>

          <FormField label="Lease end" error={errors.leaseEnd}>
            <input
              type="date"
              value={form.leaseEnd}
              onChange={update('leaseEnd')}
              className={`${INPUT_CLASS} ${errors.leaseEnd ? 'border-[#C24B4B]' : ''}`}
            />
          </FormField>
        </div>
      </div>
    </FormCard>
  )
}
