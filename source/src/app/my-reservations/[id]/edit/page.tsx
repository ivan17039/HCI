"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
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
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    if (id) {
      fetchReservation();
    }
  }, [id]);

  const fetchReservation = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reservation");
      }

      const data = await response.json();
      setReservation(data);
      setStartDate(new Date(data.checkInDate));
      setEndDate(new Date(data.checkOutDate));
      setGuests(data.guests);
    } catch (err) {
      setError("Error fetching reservation details");
      console.error(err);
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update reservation");
      }

      router.push(`/my-reservations/${id}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error updating reservation");
      }
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

  if (error) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent>
            <p className="text-red-500 text-center">{error}</p>
            <Button
              variant="secondary"
              className="mt-4 w-full"
              onClick={() => router.push(`/my-reservations/${id}`)}
            >
              Back to Reservation Details
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent>
            <p className="text-center">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (reservation.status === "confirmed") {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-200 text-red-500">
          <CardContent>
            <p className="text-center mb-4">
              This reservation is confirmed and cannot be modified.{" "}
              <span className="text-gray-700">Contact us to make changes.</span>
            </p>
            <Button
              className="w-[80%] ml-10 nav-linkbtn"
              onClick={() => router.push(`/my-reservations/${id}`)}
            >
              Back to Reservation Details
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
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
                reservations={[]}
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
