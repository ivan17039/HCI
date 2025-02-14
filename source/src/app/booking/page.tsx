"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookingForm from "./_components/booking-form";
import { ReservationSummary } from "./_components/reservation-summary";
import { useBookingStore } from "@/hooks/useBookingStore";

const BookingPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { bookingData, setBookingData, isStepCompleted } = useBookingStore();

  useEffect(() => {
    const startDate = params?.get("startDate") || "";
    const endDate = params?.get("endDate") || "";
    const guests = Number(params?.get("guests")) || 1;

    setBookingData({ startDate, endDate, guests });
  }, [params, setBookingData]);

  useEffect(() => {
    if (isStepCompleted("dates")) {
      router.push("/booking/room");
    }
  }, [isStepCompleted, router]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-gray-700">
      <div className="grid lg:grid-cols-[1fr,400px] gap-8">
        <div>
          <div className="border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Select Dates</h2>
            <BookingForm
              reservations={[]}
              apartmentId=""
              apartmentName=""
              urlParams={{
                startDate: bookingData.startDate,
                endDate: bookingData.endDate,
                guests: String(bookingData.guests),
              }}
            />
          </div>
        </div>
        <div>
          <ReservationSummary
            startDate={bookingData.startDate}
            endDate={bookingData.endDate}
            guests={String(bookingData.guests)}
            selectedRoom={bookingData.selectedRoom}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
