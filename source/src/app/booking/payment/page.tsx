'use client'

import { useBookingStore } from '@/hooks/useBookingStore';
import { ReservationSummary } from '../_components/reservation-summary';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const { bookingData, clearBookingData } = useBookingStore();
  const { startDate, endDate, guests, selectedRoom, contactInfo } = bookingData;
  const router = useRouter();

  const handleCompleteBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cardNumber = formData.get('card') as string;
    const expiryDate = formData.get('expiry') as string;
    const cvc = formData.get('cvc') as string;

    // Pretpostavljamo da je token spremljen u localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing");
      return;
    }

    const reservationData = {
      startDate,
      endDate,
      guests,
      selectedRoom,
      contactInfo,
      paymentInfo: {
        cardNumber,
        expiryDate,
        cvc
      }
    };

    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reservationData),
    });

    if (response.ok) {
      clearBookingData(); // Očisti podatke o rezervaciji nakon uspješnog dodavanja
      router.push("/my-reservations"); // Preusmjeri korisnika na stranicu "My Reservations"
    } else {
      console.error("Failed to complete booking.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[1fr,400px] gap-8">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Payment</h1>
            <p className="text-gray-600">Complete your booking by providing payment details</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form className="space-y-6" onSubmit={handleCompleteBooking}>
              <div>
                <label htmlFor="card" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="card"
                  name="card"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-accent text-white font-semibold rounded-md"
              >
                Complete Booking
              </button>
            </form>
          </div>
        </div>

        <div>
          <ReservationSummary
            startDate={startDate}
            endDate={endDate}
            guests={String(guests)}
            selectedRoom={selectedRoom ? {
              name: selectedRoom.name,
              price: selectedRoom.price,
              image: selectedRoom.image
            } : undefined}
            contactInfo={contactInfo}
          />
        </div>
      </div>
    </div>
  );
}