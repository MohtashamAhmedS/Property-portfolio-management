'use client'

import { useEffect, useRef, useState } from 'react'
import FormCard from './FormCard'

const MAX_PHOTO_BYTES = 5 * 1024 * 1024

export default function PhotoUpload({ photo, onPhotoChange }) {
  const fileInput = useRef(null)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  // Free the preview URL when the photo changes or the page closes
  useEffect(() => {
    return () => {
      if (photo?.url) URL.revokeObjectURL(photo.url)
    }
  }, [photo])

  const handleFile = (file) => {
    if (!file) return
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Please choose a JPG or PNG image.')
      return
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setError('That image is over 5 MB.')
      return
    }
    setError('')
    onPhotoChange({ file, url: URL.createObjectURL(file) })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  return (
    <FormCard title="Photo" subtitle="Shown on the property card.">
      <input
        ref={fileInput}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {photo ? (
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.url}
            alt="Property preview"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onPhotoChange(null)}
            className="absolute right-2 top-2 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-[#002C83] shadow"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex aspect-[3/2] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed text-center transition-colors ${
            dragOver
              ? 'border-[#002C83] bg-[#002C83]/10'
              : 'border-[#9AA3C7] bg-[#F3F4FA] hover:bg-[#ECEEF8]'
          }`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-[#002C83]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </span>
          <span className="text-sm text-black">
            <span className="font-bold text-[#002C83]">Upload a photo</span>{' '}
            <span className="font-medium">or drag it here</span>
          </span>
          <span className="text-[11px] text-gray-500">
            JPG or PNG, up to 5 MB
          </span>
        </button>
      )}

      {error && <p className="mt-2 text-[11px] text-[#C24B4B]">{error}</p>}
    </FormCard>
  )
}
