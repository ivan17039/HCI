'use client'

import { useEffect, useState } from 'react'

interface BookingData {
  startDate: string
  endDate: string
  guests: number
  selectedRoom?: {
    id: string
    name: string
    price: number
    image: string
  }
}

const STORAGE_KEY = 'booking_data'

export function useBookingStore(urlParams?: {
  startDate?: string;
  endDate?: string;
  guests?: string;
  room?: string;
}) {
  const [bookingData, setBookingData] = useState<BookingData>({
    startDate: '',
    endDate: '',
    guests: 1,
  });

  // Load data from localStorage on mount and merge with URL params
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let data = stored ? JSON.parse(stored) : {};
    
    // Merge URL params with stored data, prioritizing URL params
    if (urlParams) {
      data = {
        ...data,
        startDate: urlParams.startDate || data.startDate || '',
        endDate: urlParams.endDate || data.endDate || '',
        guests: urlParams.guests ? Number(urlParams.guests) : data.guests || 1,
      };
      
      // Update stored data with URL params
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    
    setBookingData(data);
  }, [urlParams]);

  // Save data to localStorage whenever it changes
  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => {
      const newData = { ...prev, ...data }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
      return newData
    })
  }

  const clearBookingData = () => {
    localStorage.removeItem(STORAGE_KEY)
    setBookingData({
      startDate: '',
      endDate: '',
      guests: 1,
    })
  }

  return {
    bookingData,
    updateBookingData,
    clearBookingData,
  }
}

