'use client'

import { ReservationSummary } from './_components/reservation-summary'
import BookingForm from './_components/booking-form'
import { apartments } from '@/app/apartments/data/apartments'

export default function BookingPage({ 
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
      <div className="max-w-7xl mx-auto px-4 py-8 text-gray-700">
        
        <div className="grid md:grid-cols-[1fr,400px] gap-8">
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Confirm Your Dates</h1>
              <p className="text-gray-600">Review or update your selected dates and number of guests</p>
            </div>
  
            <BookingForm 
              initialStartDate={startDate}
              initialEndDate={endDate}
              initialGuests={guests}
              currentPage="booking"
            />
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

