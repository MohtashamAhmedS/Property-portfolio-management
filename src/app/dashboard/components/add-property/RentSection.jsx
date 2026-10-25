import FormCard from './FormCard'
import FormField, { INPUT_CLASS } from './FormField'

function ordinal(n) {
  const rem100 = n % 100
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`
  const suffix = { 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th'
  return `${n}${suffix}`
}

const DUE_DAYS = Array.from({ length: 28 }, (_, i) => i + 1)

function MoneyInput({ value, onChange }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
        $
      </span>
      <input
        type="number"
        min="0"
        value={value}
        onChange={onChange}
        placeholder="1,200"
        className={`${INPUT_CLASS} pl-9`}
      />
    </div>
  )
}

export default function RentSection({ form, update }) {
  return (
    <FormCard title="Rent" subtitle="What the tenant pays and when.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Monthly rent">
          <MoneyInput value={form.rent} onChange={update('rent')} />
        </FormField>

        <FormField label="Rent due on">
          <div className="relative">
            <select
              value={form.dueDay}
              onChange={update('dueDay')}
              className={`${INPUT_CLASS} appearance-none bg-white pr-10`}
            >
              {DUE_DAYS.map((day) => (
                <option key={day} value={day}>
                  {ordinal(day)} of every month
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

        <FormField label="Security deposit" optional>
          <MoneyInput value={form.deposit} onChange={update('deposit')} />
        </FormField>
      </div>
    </FormCard>
  )
}
