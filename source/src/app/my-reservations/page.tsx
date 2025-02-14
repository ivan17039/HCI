"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatusBadge,
} from "./components/reservation-ui-elements";
import { format } from "date-fns";

interface Reservation {
  id: number;
  apartmentName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  status: string;
}

export default function MyReservations() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setReservations(data);
      } else {
        console.error("Unexpected data format:", data);
        setReservations([]);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setReservations([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-xl mx-auto py-8 px-4 mt-20">
        <h1 className="text-2xl font-bold mb-6">My Reservations</h1>
        {isLoading ? (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg">
            Loading reservations...
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg">
            No reservations found
          </div>
        ) : (
          <div className="space-y-4 text-gray-600">
            {reservations.map((reservation) => (
              <Card
                key={reservation.id}
                className="hover:shadow-md transition-shadow cursor-pointer bg-white"
                onClick={() =>
                  router.push(`/my-reservations/${reservation.id}`)
                }
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {reservation.apartmentName}
                    </CardTitle>
                    <StatusBadge status={reservation.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Check-in</p>
                      <p className="font-medium">
                        {format(
                          new Date(reservation.checkInDate),
                          "MMM d, yyyy"
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Check-out</p>
                      <p className="font-medium">
                        {format(
                          new Date(reservation.checkOutDate),
                          "MMM d, yyyy"
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Guests</p>
                      <p className="font-medium">
                        {reservation.guests}{" "}
                        {reservation.guests === 1 ? "guest" : "guests"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
