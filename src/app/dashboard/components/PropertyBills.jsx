const CARD_SHADOW = '2px 2px 4px 0px rgba(0, 0, 0, 0.25)'

const STATUS_STYLES = {
  Upcoming: 'bg-[#C9822B]/15 text-[#C9822B]',
  Paid: 'bg-[#2F8A6F]/15 text-[#2F8A6F]',
  Overdue: 'bg-[#C24B4B]/15 text-[#C24B4B]',
}

const ICONS = {
  bolt: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  water: (
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  ),
  wifi: (
    <>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </>
  ),
  home: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
}

function BillIcon({ name }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#002C83]/10">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-[#002C83]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICONS[name]}
      </svg>
    </div>
  )
}

export default function PropertyBills({ bills = [], onAddBill }) {
  return (
    <section className="px-8 pb-8">
      <div
        className="rounded-2xl bg-white p-6"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium text-black">
            Bills for this property
          </h2>
          <button
            onClick={onAddBill}
            className="text-xs font-bold text-[#002C83] hover:underline"
          >
            + Add a bill
          </button>
        </div>

        <div className="mt-4 flex flex-col">
          {bills.length > 0 ? (
            bills.map((bill, index) => (
              <div
                key={bill.id}
                className={`flex items-center justify-between gap-4 py-3 ${
                  index > 0 ? 'border-t border-gray-200' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <BillIcon name={bill.icon} />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-black leading-tight">
                      {bill.name}
                    </span>
                    <span className="mt-0.5 text-xs text-gray-500">
                      {bill.note}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-black">
                    ${bill.amount.toLocaleString()}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[bill.status]}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {bill.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-xs text-gray-500">
              No bills for this property yet.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
