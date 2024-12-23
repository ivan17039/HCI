'use client'

import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/hooks/useBookingStore';
import { ReservationSummary } from '../_components/reservation-summary';

export default function ContactPage() {
  const router = useRouter();
  const { bookingData, setBookingData } = useBookingStore();
  const { startDate, endDate, guests, selectedRoom } = bookingData;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    setBookingData({
      ...bookingData,
      contactInfo: { name, email, phone }
    });

    // Navigate to the payment page
    router.push(`/booking/payment`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-gray-700">
      <div className="grid md:grid-cols-[1fr,400px] gap-8">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Contact Details</h1>
            <p className="text-gray-600">Provide your contact details to complete the booking</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-accent text-white font-semibold rounded-md"
              >
                Continue to Payment
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
          />
        </div>
      </div>
    </div>
  );
}