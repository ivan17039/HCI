"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/hooks/useBookingStore";
import { ReservationSummary } from "../_components/reservation-summary";
import { Button } from "../_components/ui";
import { Input } from "../_components/ui";
import { Label } from "../_components/ui";

export default function ContactPage() {
  const router = useRouter();
  const { bookingData, setBookingData, isStepCompleted } = useBookingStore();

  useEffect(() => {
    if (!isStepCompleted("room")) {
      router.push("/booking/room");
    }
  }, [isStepCompleted, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    setBookingData({
      contactInfo: { name, email, phone },
    });

    router.push("/booking/payment");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-gray-700">
      <div className="grid md:grid-cols-[1fr,400px] gap-8">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Contact Details</h1>
            <p className="text-gray-600">
              Provide your contact details to complete the booking
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6 ">
              <div className="space-y-2 ">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-white"
                  required
                  defaultValue={bookingData.contactInfo?.name}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-white"
                  required
                  defaultValue={bookingData.contactInfo?.email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="bg-white"
                  required
                  defaultValue={bookingData.contactInfo?.phone}
                />
              </div>

              <Button type="submit" className="nav-linkbtn w-[95%] ml-5">
                Continue to Payment
              </Button>
            </form>
          </div>
        </div>

        <div>
          <ReservationSummary
            startDate={bookingData.startDate}
            endDate={bookingData.endDate}
            guests={String(bookingData.guests)}
            selectedRoom={bookingData.selectedRoom}
            contactInfo={bookingData.contactInfo}
          />
        </div>
      </div>
    </div>
  );
}
