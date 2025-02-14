"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Reservation {
  id: number;
  apartmentName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export default function ReservationDetails() {
  const params = useParams();
  const id = params?.id as string;
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchReservation();
    }
  }, [id]);

  const fetchReservation = async () => {
    try {
      const token = localStorage.getItem("token"); // Assume token is stored in localStorage
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
    } catch (err) {
      setError("Error fetching reservation details");
      console.error(err);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!reservation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-secondary ">
      <div className="max-w-md mx-auto mt-24 mb-10 p-6 shadow-md rounded-lg text-gray-700 bg-gray-200">
        <h1 className="text-2xl font-bold mb-4">Reservation Details</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Apartment:</p>
            <p>{reservation.apartmentName}</p>
          </div>
          <div>
            <p className="font-semibold">Check-in Date:</p>
            <p>{new Date(reservation.checkInDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold">Check-out Date:</p>
            <p>{new Date(reservation.checkOutDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold">Guests:</p>
            <p>{reservation.guests}</p>
          </div>
          <div>
            <p className="font-semibold">Contact Name:</p>
            <p>{reservation.contactName}</p>
          </div>
          <div>
            <p className="font-semibold">Contact Email:</p>
            <p>{reservation.contactEmail}</p>
          </div>
          <div>
            <p className="font-semibold">Contact Phone:</p>
            <p>{reservation.contactPhone}</p>
          </div>
        </div>
        <div className=" flex justify-between  gap-5 mt-2">
          <Link href={`/my-reservations/${id}/edit`} className="nav-linkbtn">
            Edit Reservation
          </Link>
          <Link href="/my-reservations" className="book-navlink">
            Back to All Reservations
          </Link>
        </div>
      </div>
    </div>
  );
}
