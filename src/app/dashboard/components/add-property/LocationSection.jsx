import FormCard from './FormCard'
import FormField, { INPUT_CLASS } from './FormField'

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Pakistan',
  'Other',
]

export default function LocationSection({ form, errors, update }) {
  return (
    <FormCard title="Location" subtitle="Where the property is.">
      <div className="flex flex-col gap-4">
        <FormField label="Street address" error={errors.street}>
          <input
            type="text"
            value={form.street}
            onChange={update('street')}
            placeholder="12 AB Avenue"
            className={`${INPUT_CLASS} ${errors.street ? 'border-[#C24B4B]' : ''}`}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="City" error={errors.city}>
            <input
              type="text"
              value={form.city}
              onChange={update('city')}
              placeholder="AB City"
              className={`${INPUT_CLASS} ${errors.city ? 'border-[#C24B4B]' : ''}`}
            />
          </FormField>

          <FormField label="State or region">
            <input
              type="text"
              value={form.state}
              onChange={update('state')}
              placeholder="State"
              className={INPUT_CLASS}
            />
          </FormField>

          <FormField label="Postal code">
            <input
              type="text"
              value={form.postal}
              onChange={update('postal')}
              placeholder="00000"
              className={INPUT_CLASS}
            />
          </FormField>

          <FormField label="Country">
            <div className="relative">
              <select
                value={form.country}
                onChange={update('country')}
                className={`${INPUT_CLASS} appearance-none bg-white pr-10`}
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
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
            </div>
          </FormField>
        </div>
      </div>
    </FormCard>
  )
}
