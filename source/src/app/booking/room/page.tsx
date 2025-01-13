'use client'

import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/hooks/useBookingStore';
import { ReservationSummary } from '../_components/reservation-summary';
import { apartments } from '@/app/apartments/data/apartments';
import Link from "next/link";
import Image from "next/image";

export default function RoomPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const router = useRouter();
  const { bookingData, setBookingData, clearSelectedRoom } = useBookingStore(searchParams);
  const { startDate, endDate, guests, selectedRoom } = bookingData;

  const handleRoomSelect = (roomId: number) => {
    const room = apartments.find(apt => apt.id === roomId);
    if (room) {
      setBookingData({
        ...bookingData,
        selectedRoom: {
          id: String(room.id),
          name: room.name,
          price: room.price,
          image: room.images[0].src
        }
      });
      const url = `/booking/room?startDate=${startDate}&endDate=${endDate}&guests=${guests}&room=${roomId}`;
      router.push(url);
    }
  };

  const handleRoomUnselect = () => {
    clearSelectedRoom();
    const url = `/booking/room?startDate=${startDate}&endDate=${endDate}&guests=${guests}`;
    router.push(url);
  };

  const handleContinue = () => {
    if (selectedRoom) {
      router.push(`/booking/contact`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-gray-700">
      <div className="grid customLg:grid-cols-[1fr,400px] gap-8">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Select Your Room</h1>
            <p className="text-gray-600">Choose from our available rooms for your stay</p>
          </div>

          <div className="grid gap-6">
            {apartments.map((apartment) => (
              <div 
                key={apartment.id}
                className={`border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow
                  ${String(apartment.id) === selectedRoom?.id ? 'border-primary' : ''}`}
              >
                <div className="grid customLg:grid-cols-[300px,1fr] gap-6">
                  <div className="relative h-[200px] customLg:h-full">
                    <Image
                      src={apartment.images[0].src}
                      alt={apartment.images[0].alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-6 flex flex-col justify-between">
                    <div >
                      <h3 className="text-xl font-semibold mb-2">{apartment.name}</h3>
                      <p className="text-gray-600 mb-4">{apartment.description}</p>
                      
                      <div className="grid grid-cols-1 gap-4 mb-4 text-sm text-gray-600">
                        <div>
                          <span className="font-semibold">Bedrooms:</span> {apartment.bedrooms}
                        </div>
                        <div>
                          <span className="font-semibold">Bathrooms:</span> {apartment.bathrooms}
                        </div>
                        <div>
                          <span className="font-semibold">Size:</span> {apartment.size}m²
                        </div>
                        <div>
                          <span className="font-semibold">Max Guests:</span> {apartment.bedrooms * 2}
                        </div>
                      </div>
                    </div>
                   
                    <div className="flex items-center gap-10 mt-4">
                      <div className="text-lg">
                        <span className="font-bold">€{apartment.price}</span>
                        <span className="text-gray-600">/night</span>
                      </div>
                      <Link href={`/apartments/${apartment.id}`}>
                        <button className="shadow-mg bg-primary bg-turquoise text-white font-semibold px-4 py-2 rounded hover:bg-turquoise-dark">
                          View Details
                        </button>
                      </Link>
                      <button
                        onClick={() => String(apartment.id) === selectedRoom?.id ? handleRoomUnselect() : handleRoomSelect(apartment.id)}
                        className={`px-6 py-2 rounded-md transition-colors ${
                          String(apartment.id) === selectedRoom?.id
                            ? 'bg-red-500 text-white'
                            : 'bg-primary text-white hover:bg-accent'
                        }`}
                      >
                        {String(apartment.id) === selectedRoom?.id ? 'Unselect' : 'Select Room'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedRoom && (
            <div className="mt-8">
              <button
                onClick={handleContinue}
                className="w-full px-6 py-3 bg-primary hover:bg-accent text-white font-semibold rounded-md"
              >
                Continue to Contact Details
              </button>
            </div>
          )}
        </div>

        <div>
          <ReservationSummary
            startDate={startDate}
            endDate={endDate}
            guests={String(guests)}
            selectedRoom={selectedRoom ? {
              name: selectedRoom.name,
              price: selectedRoom.price,
              image: selectedRoom.image
            } : undefined}
          />
        </div>
      </div>
    </div>
  );
}