'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase/client'

export default function TestDb() {
  const [msg, setMsg] = useState('Testing...')

  useEffect(() => {
    createClient()
      .from('properties')
      .select('*')
      .then(({ data, error }) =>
        setMsg(
          error ? 'Error: ' + error.message : 'Connected. Rows: ' + data.length,
        ),
      )
  }, [])

  return <p className="p-10">{msg}</p>
}
