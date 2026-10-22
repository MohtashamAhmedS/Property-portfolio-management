'use client'

export default function EmptyPropertiesState({ onAddProperty }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold text-black">Add a property</h2>
      <button
        type="button"
        onClick={onAddProperty}
        className="rounded-full bg-[#002C83] text-white text-sm font-medium px-6 py-3 hover:brightness-110 transition-all"
      >
        Add a property
      </button>
    </div>
  )
}
