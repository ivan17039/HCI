'use client'
import Image from 'next/image'
interface ReservationSummaryProps {
  startDate?: string
  endDate?: string
  guests?: string
  selectedRoom?: {
    name: string
    price: number
    image: string
  }
}

export function ReservationSummary({ 
  startDate, 
  endDate, 
  guests, 
  selectedRoom 
}: ReservationSummaryProps) {
  const calculateNights = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-fit text-gray-700">
      <h2 className="text-xl font-bold mb-4">Reservation Summary</h2>
      
      {selectedRoom && (
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <Image
              src={selectedRoom.image}
              alt={selectedRoom.name}
              className="w-20 h-20 rounded-md object-cover"
              width={`400`}
              height={`300`}
            />
            <div>
              <h3 className="font-semibold">{selectedRoom.name}</h3>
              <p className="text-sm text-gray-600">€{selectedRoom.price} per night</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Dates</h3>
          <p className="text-gray-600">
            {startDate && endDate ? (
              `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
            ) : (
              'No dates selected'
            )}
          </p>
          {nights > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {nights} {nights === 1 ? 'night' : 'nights'}
            </p>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-1">Guests</h3>
          <p className="text-gray-600">
            {guests} {Number(guests) === 1 ? 'guest' : 'guests'}
          </p>
        </div>

        {selectedRoom && (
          <>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span>Room ({nights} {nights === 1 ? 'night' : 'nights'})</span>
                <span>€{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Taxes & fees</span>
                <span>€{(totalPrice * 0.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                <span>Total</span>
                <span>€{(totalPrice * 1.2).toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

