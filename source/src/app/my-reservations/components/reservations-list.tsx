"use client";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon, UsersIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  StatusBadge,
} from "./reservation-ui-elements";

interface Reservation {
  id: number;
  apartmentName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  status: string;
}

export function ReservationsList({
  reservations,
}: {
  reservations: Reservation[];
}) {
  const router = useRouter();

  if (reservations.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-gray-500">
          No reservations found.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <Card
          key={reservation.id}
          className="hover:shadow-md transition-shadow"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">
              {reservation.apartmentName}
            </CardTitle>
            <StatusBadge status={reservation.status} />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                <span>
                  {format(new Date(reservation.checkInDate), "MMM d, yyyy")} -{" "}
                  {format(new Date(reservation.checkOutDate), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center">
                <UsersIcon className="mr-2 h-4 w-4 text-gray-400" />
                <span>
                  {reservation.guests}{" "}
                  {reservation.guests === 1 ? "guest" : "guests"}
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <Button
                variant="secondary"
                onClick={() =>
                  router.push(`/my-reservations/${reservation.id}`)
                }
              >
                View Details
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  router.push(`/my-reservations/${reservation.id}/edit`)
                }
              >
                Modify
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ReservationsListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="mt-4 flex justify-between">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
