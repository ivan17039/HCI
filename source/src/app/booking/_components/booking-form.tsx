'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface BookingFormProps {
  initialStartDate?: string
  initialEndDate?: string
  initialGuests?: string
  currentPage?: 'main' | 'booking'
}

export default function BookingForm({ 
  initialStartDate,
  initialEndDate,
  initialGuests,
  currentPage = 'main'
}: BookingFormProps) {
  const router = useRouter()
  const [startDate, setStartDate] = useState(initialStartDate || '')
  const [endDate, setEndDate] = useState(initialEndDate || '')
  const [guests, setGuests] = useState(initialGuests ? Number(initialGuests) : 1)
  const [minDate, setMinDate] = useState('')

  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toISOString().split('T')[0]
    setMinDate(formattedDate)
    if (!startDate && !initialStartDate) setStartDate(formattedDate)
  }, [startDate, initialStartDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextPath = currentPage === 'main' ? '/booking' : '/booking/room'
    router.push(`${nextPath}?startDate=${startDate}&endDate=${endDate}&guests=${guests}`)
  }

  return (
    <div className="bg-white/95 p-6 rounded-lg shadow-lg w-full max-w-[600px] mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
              Check in
            </label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              min={minDate}
              onChange={(e) => {
                setStartDate(e.target.value)
                if (e.target.value > endDate) {
                  setEndDate(e.target.value)
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="flex-1">
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
              Check out
            </label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              min={startDate || minDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="flex-1">
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
              Guests
            </label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary hover:bg-accent text-white font-semibold rounded-md"
          >
            {currentPage === 'main' ? 'Next' : 'Update and Continue'}
          </button>
        </div>
      </form>
    </div>
  )
}

