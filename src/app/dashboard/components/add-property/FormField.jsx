export const INPUT_CLASS =
  'w-full rounded-xl border border-gray-200 bg-[#F6F7FB] px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition-colors focus:border-[#002C83] focus:bg-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'

export default function FormField({ label, optional, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-black">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-gray-500">(optional)</span>
        )}
      </span>
      {children}
      {error && <span className="text-[11px] text-[#C24B4B]">{error}</span>}
    </label>
  )
}
