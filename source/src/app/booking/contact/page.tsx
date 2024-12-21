'use client'

import { ReservationSummary } from '../_components/reservation-summary'
import { apartments } from '@/app/apartments/data/apartments'
import { useRouter } from 'next/navigation'

export default function ContactPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string } 
}) {
  const router = useRouter()
  const startDate = searchParams.startDate || ''
  const endDate = searchParams.endDate || ''
  const guests = searchParams.guests || ''
  const selectedRoomId = searchParams.room

  const selectedRoom = selectedRoomId 
    ? apartments.find(apt => String(apt.id) === selectedRoomId)
    : undefined

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(
        `/booking/payment?startDate=${startDate}&endDate=${endDate}&guests=${guests}&room=${selectedRoomId}`
      )
      
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <div className="grid md:grid-cols-[1fr,400px] gap-8">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Contact Information</h1>
            <p className="text-gray-600">Please provide your contact details</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-accent text-white font-semibold rounded-md"
              >
                Continue to Payment
              </button>
            </form>
          </div>
        </div>

        <div>
          <ReservationSummary
            startDate={startDate}
            endDate={endDate}
            guests={guests}
            selectedRoom={selectedRoom ? {
              name: selectedRoom.name,
              price: selectedRoom.price,
              image: selectedRoom.images[0].src
            } : undefined}
          />
        </div>
      </div>
    </div>
  )
}

