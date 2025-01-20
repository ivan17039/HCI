'use client'

import { useEffect, useState } from 'react';

interface BookingData {
  startDate: string;
  endDate: string;
  guests: number;
  selectedRoom?: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  contactInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

const STORAGE_KEY = 'booking_data';

export function useBookingStore(urlParams?: {
  startDate?: string;
  endDate?: string;
  guests?: string;
  room?: string;
}) {
  const [bookingData, setBookingData] = useState<BookingData>(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : {
        startDate: urlParams?.startDate || '',
        endDate: urlParams?.endDate || '',
        guests: urlParams?.guests ? parseInt(urlParams.guests) : 1,
        selectedRoom: undefined,
        contactInfo: undefined
      };
    }
    return {
      startDate: urlParams?.startDate || '',
      endDate: urlParams?.endDate || '',
      guests: urlParams?.guests ? parseInt(urlParams.guests) : 1,
      selectedRoom: undefined,
      contactInfo: undefined
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData));
  }, [bookingData]);

  const clearSelectedRoom = () => {
    setBookingData({
      ...bookingData,
      selectedRoom: undefined
    });
  };

  const clearBookingData = () => {
    setBookingData({
      startDate: '',
      endDate: '',
      guests: 1,
      selectedRoom: undefined,
      contactInfo: undefined
    });
  };

  return {
    bookingData,
    setBookingData,
    clearSelectedRoom,
    clearBookingData
  };
}