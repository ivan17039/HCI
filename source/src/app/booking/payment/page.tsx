"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/hooks/useBookingStore";
import { ReservationSummary } from "../_components/reservation-summary";
import { Button } from "../_components/ui";
import { Input } from "../_components/ui";
import { Label } from "../_components/ui";
import { Alert } from "../_components/ui";

import { LoginForm } from "../../login/components/login-form";
import { RegisterForm } from "../../register/components/register-form";
import { AlertTitle, AlertDescription } from "../_components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../_components/ui";

export default function PaymentPage() {
  const router = useRouter();
  const { bookingData, clearBookingData, isStepCompleted } = useBookingStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAuthForms, setShowAuthForms] = useState(false);

  useEffect(() => {
    if (!isStepCompleted("contact")) {
      router.push("/booking/contact-data");
      return;
    }

    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setShowAuthForms(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [isStepCompleted, router]);

  const handleCompleteBooking = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setShowAuthForms(true);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const cardNumber = formData.get("card") as string;
    const expiryDate = formData.get("expiry") as string;
    const cvc = formData.get("cvc") as string;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      return;
    }

    const reservationData = {
      ...bookingData,
      paymentInfo: {
        cardNumber,
        expiryDate,
        cvc,
      },
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        clearBookingData();
        router.push("/my-reservations");
      } else {
        throw new Error("Failed to complete booking");
      }
    } catch (error) {
      console.error("Error completing booking:", error);
      // Here you would typically show an error message to the user
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthForms(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  const handleExpiryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length === 2 && !value.includes("/")) {
      event.target.value = value + "/";
    }
  };

  const handleCardNumberInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const formattedValue = value
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    event.target.value = formattedValue;
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-gray-700">
      <div className="grid md:grid-cols-[1fr,400px] gap-8">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Payment</h1>
            <p className="text-gray-600">
              Complete your booking by providing payment details
            </p>
          </div>

          {showAuthForms ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Alert>
                <AlertTitle>Authentication Required</AlertTitle>
                <AlertDescription>
                  Please log in or register to complete your booking.
                </AlertDescription>
              </Alert>
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm onSuccess={handleAuthSuccess} />
                </TabsContent>
                <TabsContent value="register">
                  <RegisterForm onSuccess={handleAuthSuccess} />
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <form className="space-y-6" onSubmit={handleCompleteBooking}>
                <div className="space-y-2">
                  <Label htmlFor="card">Card Number</Label>
                  <Input
                    type="text"
                    id="card"
                    name="card"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19} // 16 digits + 3 spaces
                    onChange={handleCardNumberInput}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      type="text"
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      maxLength={5}
                      onChange={handleExpiryInput}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      type="text"
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="nav-linkbtn w-[95%] ml-5">
                  Complete Booking
                </Button>
              </form>
            </div>
          )}
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
