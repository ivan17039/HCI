"use client";

import { useEffect, useState } from "react";
import { ReservationsList, ReservationsListSkeleton } from "@/components/reservations-list";

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    const token = localStorage.getItem("token"); // Pretpostavljamo da je token spremljen u localStorage
    console.log("Token used in fetchReservations:", token); // Dodano za provjeru tokena

    if (!token) {
      console.error("Token is missing");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/reservations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch reservations:", response.statusText);
      setLoading(false);
      return;
    }

    const data = await response.json();
    console.log("Fetched reservations:", data); // Dodano za provjeru podataka
    setReservations(data);
    setLoading(false);
  };

  useEffect(() => {
    const handleLogin = () => {
      fetchReservations();
    };

    window.addEventListener("login", handleLogin);

    fetchReservations();

    return () => {
      window.removeEventListener("login", handleLogin);
    };
  }, []);

  console.log("Reservations state:", reservations); // Dodano za provjeru stanja

  return (
    <main className="flex-grow p-6 pt-32 text-black">
      <h1 className="text-2xl font-bold mb-4">My Reservations</h1>
      {loading ? <ReservationsListSkeleton /> : <ReservationsList reservations={reservations} />}
    </main>
  );
}