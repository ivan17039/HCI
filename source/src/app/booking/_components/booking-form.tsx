"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/hooks/useBookingStore";
import { BookingCalendar } from "./booking-calendar";
import { format } from "date-fns";

interface Reservation {
  apartmentId: string;
  apartmentName: string;
  startDate: string;
  endDate: string;
}

interface BookingFormProps {
  reservations: Reservation[];
  apartmentId: string;
  apartmentName: string;
  urlParams?: {
    startDate?: string;
    endDate?: string;
    guests?: string;
  };
}

export default function BookingForm({
  reservations,
  apartmentId,
  apartmentName,
  urlParams,
}: BookingFormProps) {
  const router = useRouter();
  const { bookingData, setBookingData } = useBookingStore();
  const [localStartDate, setLocalStartDate] = useState<Date | null>(null);
  const [localEndDate, setLocalEndDate] = useState<Date | null>(null);
  const [localGuests, setLocalGuests] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [allReservations, setAllReservations] =
    useState<Reservation[]>(reservations);

  // Fetch all reservations when component mounts
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("/api/availability");
        if (!response.ok) throw new Error("Failed to fetch reservations");
        const data = await response.json();
        setAllReservations(
          data.map((res: any) => ({
            ...res,
            apartmentName: res.apartmentName || "Unknown Apartment",
          }))
        );
      } catch (error) {
        console.error("Error loading reservations:", error);
        setAllReservations(reservations);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    if (urlParams?.startDate) setLocalStartDate(new Date(urlParams.startDate));
    if (urlParams?.endDate) setLocalEndDate(new Date(urlParams.endDate));
    if (urlParams?.guests) setLocalGuests(Number(urlParams.guests));
  }, [urlParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".calendar-wrapper") &&
        !target.closest(".date-input")
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateSelect = (date: Date) => {
    if (!localStartDate || (localStartDate && localEndDate)) {
      setLocalStartDate(date);
      setLocalEndDate(null);
    } else {
      setLocalEndDate(date);
      setShowCalendar(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localStartDate || !localEndDate) return;

    const updatedBookingData = {
      ...bookingData,
      startDate: format(localStartDate, "yyyy-MM-dd"),
      endDate: format(localEndDate, "yyyy-MM-dd"),
      guests: localGuests,
    };

    setBookingData(updatedBookingData);

    router.push(
      `/booking/room?apartmentId=${apartmentId}&startDate=${updatedBookingData.startDate}&endDate=${updatedBookingData.endDate}&guests=${updatedBookingData.guests}`
    );
  };

  const dateRangeText = () => {
    if (!localStartDate) return "Select dates";
    if (!localEndDate) return `From ${format(localStartDate, "MMM dd, yyyy")}`;
    return `${format(localStartDate, "MMM dd")} - ${format(
      localEndDate,
      "MMM dd, yyyy"
    )}`;
  };

  return (
    <div className="bg-white/95 p-6 rounded-lg shadow-lg w-full max-w-[600px] mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dates
            </label>
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:ring-primary focus:border-primary date-input"
            >
              {dateRangeText()}
            </button>
            {showCalendar && (
              <div className="absolute z-20 mt-1 calendar-wrapper">
                <BookingCalendar
                  selectedStartDate={localStartDate}
                  selectedEndDate={localEndDate}
                  onDateSelect={handleDateSelect}
                  reservations={allReservations}
                  apartment={{ id: apartmentId, name: apartmentName }}
                  minDate={new Date()}
                />
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="guests"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Guests
            </label>
            <select
              id="guests"
              value={localGuests}
              onChange={(e) => setLocalGuests(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!localStartDate || !localEndDate}
          className="w-full px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}
