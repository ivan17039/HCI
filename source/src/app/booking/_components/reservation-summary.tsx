"use client";

import Image from "next/image";

import { useBookingStore } from "@/hooks/useBookingStore";

interface ReservationSummaryProps {
  startDate?: string;
  endDate?: string;
  guests?: string;
  selectedRoom?: {
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

export function ReservationSummary({
  startDate,
  endDate,
  guests,
  selectedRoom,
  contactInfo,
}: ReservationSummaryProps) {
  const { clearSelectedRoom } = useBookingStore();

  const calculateNights = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(diffDays, 1); // Ensure at least 1 night is calculated
  };

  const nights = calculateNights();
  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-fit text-gray-700">
      <h2 className="text-xl font-bold mb-4">Reservation Summary</h2>

      {selectedRoom && (
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <div className="relative">
              <Image
                src={selectedRoom.image || "/placeholder.svg"}
                alt={selectedRoom.name}
                className="w-20 h-20 rounded-md object-cover"
                width={400}
                height={300}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{selectedRoom.name}</h3>
                <button
                  className="h-8 w-8 -mt-1 -mr-2 hover:bg-gray-100"
                  onClick={clearSelectedRoom}
                ></button>
              </div>
              <p className="text-sm text-gray-600">
                €{selectedRoom.price} per night
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Dates</h3>
          <p className="text-gray-600">
            {startDate && endDate
              ? `${new Date(startDate).toLocaleDateString()} - ${new Date(
                  endDate
                ).toLocaleDateString()}`
              : "No dates selected"}
          </p>
          {nights > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {nights} {nights === 1 ? "night" : "nights"}
            </p>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-1">Guests</h3>
          <p className="text-gray-600">
            {guests} {Number(guests) === 1 ? "guest" : "guests"}
          </p>
        </div>

        {selectedRoom && (
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>
                Room ({nights} {nights === 1 ? "night" : "nights"})
              </span>
              <span>€{totalPrice}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
              <span>Total</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {contactInfo && (
        <div className="mt-4 pt-4 border-t">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <p>
            <strong>Name:</strong> {contactInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {contactInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {contactInfo.phone}
          </p>
        </div>
      )}
    </div>
  );
}
