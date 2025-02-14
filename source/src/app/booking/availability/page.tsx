"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apartments } from "../../apartments/data/apartments";
import { Button } from "../_components/reservation-ui-elements";
import { AvailabilityCalendar } from "../_components/availability-calendar";

interface Reservation {
  apartmentName: string;
  startDate: string;
  endDate: string;
}

export default function AvailabilityPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedApartment, setSelectedApartment] = useState(apartments[0]?.id);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await fetch("/api/availability");
        if (!response.ok) throw new Error("Failed to fetch reservations");
        const data: Reservation[] = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Error loading reservations:", error);
      }
    }
    fetchReservations();
  }, []);

  return (
    <div className="text-gray-600 max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Check Availability</h1>
        <Button className="nav-linkbtn" onClick={() => router.back()}>
          Continue Booking
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {apartments.map((apartment) => {
          const apartmentReservations = reservations.filter(
            (res) => res.apartmentName === apartment.name
          );

          return (
            <div key={apartment.id} className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">{apartment.name}</h2>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Pricing</h3>
                <p className="text-lg">From €{apartment.price} per night</p>
              </div>

              <div className="mt-4">
                <AvailabilityCalendar
                  apartmentName={apartment.name}
                  reservations={apartmentReservations}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
