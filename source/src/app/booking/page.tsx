'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingForm from './_components/booking-form';
import { ReservationSummary } from './_components/reservation-summary';
import { useBookingStore } from '@/hooks/useBookingStore';
import { apartments } from '@/app/apartments/data/apartments';


interface PageProps {
  searchParams?: { [key: string]: string };
}

const BookingPage = ({ searchParams = {} }: PageProps) => {
  const params = useSearchParams();
  const { bookingData, setBookingData } = useBookingStore({
    startDate: params.get('startDate') || undefined,
    endDate: params.get('endDate') || undefined,
    guests: params.get('guests') || undefined,
    room: params.get('room') || undefined,
  });

  useEffect(() => {
    console.log('searchParams:', searchParams);
    console.log('apartments:', apartments);
    console.log('selectedRoomId:', params.get('room'));
  }, [searchParams, apartments, params]);

  const selectedRoom = params.get('room') && apartments
    ? apartments.find((apt) => String(apt.id) === params.get('room'))
    : undefined;

  useEffect(() => {
    if (selectedRoom) {
      setBookingData({
        ...bookingData,
        selectedRoom: {
          id: String(selectedRoom.id),
          name: selectedRoom.name,
          price: selectedRoom.price,
          image: selectedRoom.images[0].src,
        },
      });
    }
  }, [selectedRoom, bookingData, setBookingData]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-gray-700">
      <div className="grid md:grid-cols-[1fr,400px] gap-8">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Confirm Your Dates</h1>
            <p className="text-gray-600">Review or update your selected dates and number of guests</p>
          </div>

          <BookingForm currentPage="booking" />
        </div>

        <div>
          <ReservationSummary
            startDate={bookingData.startDate}
            endDate={bookingData.endDate}
            guests={String(bookingData.guests)}
            selectedRoom={
              bookingData.selectedRoom
                ? {
                    name: bookingData.selectedRoom.name,
                    price: bookingData.selectedRoom.price,
                    image: bookingData.selectedRoom.image,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
