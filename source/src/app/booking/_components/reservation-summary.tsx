"use client";

import Image from "next/image";
import { format } from "date-fns";
import { useBookingStore } from "@/hooks/useBookingStore";
import { CalendarDays, Users, CreditCard, X } from "lucide-react";
import { Button } from "./ui";
import { Separator } from "./ui";

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "EEE, MMM d, yyyy");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Reservation Summary
        </h2>

        {selectedRoom && (
          <div className="mb-6">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <Image
                  src={selectedRoom.image || "/placeholder.svg"}
                  alt={selectedRoom.name}
                  className="rounded-lg object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedRoom.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      €{selectedRoom.price} per night
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearSelectedRoom}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-3">
              <CalendarDays className="h-4 w-4" />
              <span>Your stay</span>
            </div>
            {startDate && endDate ? (
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="text-sm text-gray-600">Check-in</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(startDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Check-out</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(endDate)}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm font-medium text-primary">
                    {nights} {nights === 1 ? "night" : "nights"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No dates selected</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {guests} {Number(guests) === 1 ? "guest" : "guests"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedRoom && (
        <div className="p-6 bg-gray-50">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Room ({nights} {nights === 1 ? "night" : "nights"})
              </span>
              <span className="text-gray-900">€{totalPrice}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <span className="font-semibold text-gray-900">Total</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                €{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {contactInfo && (
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Contact Information
          </h3>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="text-gray-900">{contactInfo.name}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-900">{contactInfo.email}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="text-gray-900">{contactInfo.phone}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
