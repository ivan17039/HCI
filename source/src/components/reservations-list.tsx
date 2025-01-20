"use client";

export function ReservationsList({ reservations }: { reservations: any[] }) {
  if (!reservations.length) {
    return <p>No reservations found.</p>;
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2">{reservation.apartmentName}</h2>
          <p className="text-gray-600 mb-1">
            <strong>Check-in:</strong> {new Date(reservation.checkInDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Check-out:</strong> {new Date(reservation.checkOutDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Guests:</strong> {reservation.guests}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Contact Name:</strong> {reservation.contactName}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Contact Email:</strong> {reservation.contactEmail}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Contact Phone:</strong> {reservation.contactPhone}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ReservationsListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md bg-white animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-1"></div>
          <div className="h-4 bg-gray-300 rounded mb-1"></div>
          <div className="h-4 bg-gray-300 rounded mb-1"></div>
          <div className="h-4 bg-gray-300 rounded mb-1"></div>
          <div className="h-4 bg-gray-300 rounded mb-1"></div>
          <div className="h-4 bg-gray-300 rounded mb-1"></div>
        </div>
      ))}
    </div>
  );
}