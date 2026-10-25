import FormCard from './FormCard'
import FormField, { INPUT_CLASS } from './FormField'

const PROPERTY_TYPES = ['House', 'Apartment', 'Duplex', 'Shop', 'Other']

export default function PropertyDetailsSection({ form, update, onTypeChange }) {
  return (
    <FormCard
      title="Property details"
      subtitle="Helps you tell your properties apart."
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-black">Property type</span>
          <div className="flex flex-wrap gap-2">
            {PROPERTY_TYPES.map((t) => {
              const active = form.type === t
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onTypeChange(t)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'border-[#002C83] bg-[#002C83] text-white'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Bedrooms">
            <input
              type="number"
              min="0"
              value={form.bedrooms}
              onChange={update('bedrooms')}
              placeholder="3"
              className={INPUT_CLASS}
            />
          </FormField>

          <FormField label="Bathrooms">
            <input
              type="number"
              min="0"
              value={form.bathrooms}
              onChange={update('bathrooms')}
              placeholder="2"
              className={INPUT_CLASS}
            />
          </FormField>

          <FormField label="Floor area (sq ft)">
            <input
              type="number"
              min="0"
              value={form.floorArea}
              onChange={update('floorArea')}
              placeholder="1,850"
              className={INPUT_CLASS}
            />
          </FormField>

          <FormField label="Year built" optional>
            <input
              type="number"
              min="0"
              value={form.yearBuilt}
              onChange={update('yearBuilt')}
              placeholder="2018"
              className={INPUT_CLASS}
            />
          </FormField>
        </div>
      </div>
    </FormCard>
  )
}
