"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
} from "../../components/reservation-ui-elements";
import { BookingCalendar } from "../../../booking/_components/booking-calendar";
import { format } from "date-fns";

interface Reservation {
  id: number;
  apartmentId: string;
  apartmentName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  status: string;
}

export default function EditReservation() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [apartmentReservations, setApartmentReservations] = useState<
    { apartmentName: string; startDate: string; endDate: string }[]
  >([]);

  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    if (id) {
      fetchReservation();
    }
  }, [id]);

  const fetchReservationsForApartment = async (
    apartmentName: string,
    apartmentId: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/api/reservations?apartmentName=${encodeURIComponent(apartmentName)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok)
        throw new Error("Failed to fetch apartment reservations");

      const data = await response.json();
      console.log("Fetched apartment reservations:", data); // Debugging

      // Dodajemo apartmentId u podatke koje šaljemo BookingCalendaru
      const formattedReservations = data.map((res: any) => ({
        apartmentId: apartmentId, // Ručno dodajemo apartmentId jer ga API ne vraća
        startDate: res.checkInDate,
        endDate: res.checkOutDate,
      }));

      setApartmentReservations(formattedReservations);
    } catch (err) {
      console.error("Error fetching apartment reservations", err);
    }
  };

  const fetchReservation = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch reservation");
      const data = await response.json();
      setReservation(data);
      setStartDate(new Date(data.checkInDate));
      setEndDate(new Date(data.checkOutDate));
      setGuests(data.guests);
      fetchReservationsForApartment(data.apartmentName, data.apartmentId);
    } catch (err) {
      setError("Error fetching reservation details");
      console.error(err);
    }
  };

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      setEndDate(date);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/reservations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(endDate, "yyyy-MM-dd"),
          guests,
        }),
      });
      if (!response.ok) throw new Error("Failed to update reservation");
      router.push(`/my-reservations/${id}`);
    } catch (err) {
      setError("Error updating reservation");
      console.error(err);
    }
  };

  if (reservation && reservation.status === "confirmed") {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-200 text-red-500">
          <CardContent>
            <p className="text-center mb-4">
              This reservation is confirmed and cannot be modified.{" "}
              <span className="text-gray-700">Contact us to make changes.</span>
            </p>
            <div className="flex flex-col gap-3">
              <button
                className="w-[80%] ml-10 nav-linkbtn"
                onClick={() => router.push(`/my-reservations/${id}`)}
              >
                Back to Reservation Details
              </button>
              <Link
                href="/contact"
                className="w-[80%] ml-10 nav-linkbtn text-center"
              >
                Contact Us
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!reservation) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="bg-secondary min-h-screen flex items-center justify-center mt-20">
      <Card className="w-full max-w-lg bg-gray-200">
        <CardHeader>
          <CardTitle>Edit Reservation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dates
              </label>
              <BookingCalendar
                selectedStartDate={startDate}
                selectedEndDate={endDate}
                onDateSelect={handleDateSelect}
                reservations={apartmentReservations}
                apartment={{
                  id: reservation.apartmentId,
                  name: reservation.apartmentName,
                }}
                minDate={new Date()}
              />
            </div>
            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Number of Guests
              </label>
              <Input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                min={1}
                max={10}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <button type="submit" className="nav-linkbtn ml-2">
                Update Reservation
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="book-navlink transition duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
