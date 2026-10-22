const CARD_SHADOW = '2px 2px 4px 0px rgba(0, 0, 0, 0.25)'

const STATUS_STYLES = {
  Pending: 'bg-[#C9822B]/15 text-[#C9822B]',
  Paid: 'bg-[#2F8A6F]/15 text-[#2F8A6F]',
  Overdue: 'bg-[#C24B4B]/15 text-[#C24B4B]',
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-bold text-black">{value}</span>
    </div>
  )
}

function TenantCard({ tenant }) {
  return (
    <div
      className="rounded-2xl bg-white p-5"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-black">Tenant</h2>
        <button className="text-xs font-bold text-[#002C83] hover:underline">
          Message
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#002C83]/10 text-xs font-medium text-[#002C83]">
          {initials(tenant.name)}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-black leading-tight">
            {tenant.name}
          </span>
          <span className="mt-0.5 text-[11px] text-gray-500">
            Tenant since {tenant.since}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        <InfoRow label="Phone" value={tenant.phone} />
        <InfoRow label="Email" value={tenant.email} />
        <InfoRow
          label="Deposit held"
          value={`$${tenant.deposit.toLocaleString()}`}
        />
        <InfoRow label="Lease term" value={tenant.leaseTerm} />
      </div>

      {/* Lease progress */}
      <div className="mt-2.5">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#002C83]"
            style={{ width: `${tenant.leaseProgress}%` }}
          />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-500">
          <span>Started {tenant.leaseStart}</span>
          <span>Ends {tenant.leaseEnd}</span>
        </div>
      </div>
    </div>
  )
}

function RentHistoryCard({ history }) {
  return (
    <div
      className="rounded-2xl bg-white p-5"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-black">Rent history</h2>
        <button className="text-xs font-bold text-[#002C83] hover:underline">
          View all
        </button>
      </div>

      <div className="mt-3 overflow-x-auto">
        <div className="min-w-[440px]">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] px-0 pb-2 text-[11px] font-medium text-gray-500">
            <span>Month</span>
            <span>Amount</span>
            <span>Paid on</span>
            <span>Status</span>
          </div>

          {history.map((row) => (
            <div
              key={row.month}
              className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center border-t border-gray-200 py-3"
            >
              <span className="text-xs text-black">{row.month}</span>
              <span className="text-xs font-bold text-black">
                ${row.amount.toLocaleString()}
              </span>
              <span className="text-xs text-gray-600">{row.paidOn ?? '—'}</span>
              <span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[row.status]}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {row.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TenantRentSection({ tenant, history }) {
  return (
    <section className="grid grid-cols-1 gap-4 px-8 pb-8 lg:grid-cols-[2fr_3fr]">
      <TenantCard tenant={tenant} />
      <RentHistoryCard history={history} />
    </section>
  )
}
