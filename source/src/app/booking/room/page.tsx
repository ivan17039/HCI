"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";
import { apartments } from "@/app/apartments/data/apartments";
import { checkAvailability } from "@/lib/date-utils";
import { Card, Button } from "../_components/ui";
import { ReservationSummary } from "../_components/reservation-summary";

interface ApartmentAvailability {
  id: string;
  isAvailable: boolean;
  isChecking: boolean;
}

export default function RoomSelectionPage() {
  const router = useRouter();
  const { bookingData, setBookingData, clearSelectedRoom, isStepCompleted } =
    useBookingStore();
  const [availabilityStatus, setAvailabilityStatus] = useState<
    ApartmentAvailability[]
  >([]);

  useEffect(() => {
    if (!isStepCompleted("dates")) {
      router.push("/booking");
      return;
    }

    const initialStatus = apartments.map((apt) => ({
      id: String(apt.id),
      isAvailable: true,
      isChecking: true,
    }));
    setAvailabilityStatus(initialStatus);

    const checkAllApartments = async () => {
      const checkPromises = apartments.map(async (apartment) => {
        try {
          const isAvailable = await checkAvailability(
            bookingData.startDate,
            bookingData.endDate,
            apartment.name
          );
          return {
            id: String(apartment.id),
            isAvailable,
            isChecking: false,
          };
        } catch (error) {
          console.error(
            `Error checking availability for ${apartment.name}:`,
            error
          );
          return {
            id: String(apartment.id),
            isAvailable: false,
            isChecking: false,
          };
        }
      });

      const results = await Promise.all(checkPromises);
      setAvailabilityStatus(results);
    };

    if (bookingData.startDate && bookingData.endDate) {
      checkAllApartments();
    }
  }, [bookingData.startDate, bookingData.endDate, isStepCompleted, router]);

  const handleSelectRoom = (apartment: (typeof apartments)[0]) => {
    const apartmentStatus = availabilityStatus.find(
      (status) => status.id === String(apartment.id)
    );

    if (!apartmentStatus?.isAvailable) {
      toast.error("This apartment is not available for the selected dates");
      return;
    }

    const selectedRoom = {
      id: String(apartment.id),
      name: apartment.name,
      price: apartment.price,
      image: apartment.images[0].src,
    };

    setBookingData({ selectedRoom });
  };

  const handleRoomUnselect = () => {
    clearSelectedRoom();
  };

  const getAvailabilityStatus = (apartmentId: number) => {
    return availabilityStatus.find(
      (status) => status.id === String(apartmentId)
    );
  };

  const handleContinue = () => {
    if (bookingData.selectedRoom) {
      router.push("/booking/contact-data");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[1fr,400px] gap-8">
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Select Your Room</h1>
            <Button
              onClick={() => router.push("/booking/availability")}
              variant="outline"
              className="flex items-center gap-2 bg-primary"
            >
              <CalendarDays className="h-4 w-4 " />
              View Full Availability
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {apartments.map((apartment) => {
              const status = getAvailabilityStatus(apartment.id);

              return (
                <Card key={apartment.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={apartment.images[0].src || "/placeholder.svg"}
                      alt={apartment.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {apartment.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {apartment.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-lg font-bold text-gray-700">
                        €{apartment.price} / night
                      </p>
                      {status?.isChecking ? (
                        <p className="text-gray-500">
                          Checking availability...
                        </p>
                      ) : status?.isAvailable ? (
                        <p className="text-green-500">Available</p>
                      ) : (
                        <p className="text-red-500">Not available</p>
                      )}
                    </div>
                    <Button
                      onClick={() =>
                        String(apartment.id) === bookingData.selectedRoom?.id
                          ? handleRoomUnselect()
                          : handleSelectRoom(apartment)
                      }
                      className={`w-full ${
                        String(apartment.id) === bookingData.selectedRoom?.id
                          ? "bg-red-500 text-white hover:bg-red-400"
                          : "bg-primary text-white hover:bg-accent"
                      }`}
                      disabled={status?.isChecking || !status?.isAvailable}
                    >
                      {status?.isChecking
                        ? "Checking..."
                        : String(apartment.id) === bookingData.selectedRoom?.id
                        ? "Unselect"
                        : status?.isAvailable
                        ? "Select Room"
                        : "Not Available"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
          {bookingData.selectedRoom && (
            <div className="mt-8">
              <Button
                onClick={handleContinue}
                className="nav-linkbtn w-[95%] ml-6"
              >
                Continue to Contact Details
              </Button>
            </div>
          )}
        </div>

        <div className="h-fit sticky top-8">
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
}
