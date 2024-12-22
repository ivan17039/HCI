'use client'

import { ReservationSummary } from '../_components/reservation-summary'
import { apartments } from '@/app/apartments/data/apartments'

export default function PaymentPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string } 
}) {
  const startDate = searchParams.startDate || ''
  const endDate = searchParams.endDate || ''
  const guests = searchParams.guests || ''
  const selectedRoomId = searchParams.room

  const selectedRoom = selectedRoomId 
    ? apartments.find(apt => String(apt.id) === selectedRoomId)
    : undefined

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <div className="grid md:grid-cols-[1fr,400px] gap-8">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Payment</h1>
            <p className="text-gray-600">Complete your booking by providing payment details</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form className="space-y-6">
              <div>
                <label htmlFor="card" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="card"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-accent text-white font-semibold rounded-md"
              >
                Complete Booking
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
