import { useState, useRef } from 'react'
import { api } from '../api/client.js'

export default function usePiTrigger(onComplete) {
  const [loading, setLoading]   = useState(false)
  const [status, setStatus]     = useState(null)
  const [statusColor, setColor] = useState('var(--muted)')
  const intervalRef             = useRef(null)

  function trigger() {
    setLoading(true)
    setStatus('Sending request to Raspberry Pi...')
    setColor('#f5a623')

    api.triggerRequest()
      .then(() => {
        setStatus('Pi is generating and uploading data...')
        startPolling()
      })
      .catch(() => {
        setLoading(false)
        setStatus('Failed to send request.')
        setColor('#ff4c4c')
      })
  }

  function startPolling() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    let attempts = 0

    intervalRef.current = setInterval(() => {
      attempts++
      api.triggerStatus().then(data => {
        if (data.status === 'idle' && data.completed_at) {
          clearInterval(intervalRef.current)
          setLoading(false)
          setStatus('Data refreshed!')
          setColor('#3ddc84')
          onComplete?.()
        }
      })
      if (attempts > 60) {
        clearInterval(intervalRef.current)
        setLoading(false)
        setStatus('Pi did not respond in time.')
        setColor('#ff4c4c')
      }
    }, 1000)
  }

  return { trigger, loading, status, statusColor }
}
