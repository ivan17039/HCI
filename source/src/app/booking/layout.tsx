"use client";

import { Navigation } from "./_components/navigation";
import { StepsNav } from "./_components/steps-nav";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || ""; // Osiguravamo da pathname bude string
  const isBookingFlow =
    pathname.startsWith("/booking") &&
    !pathname.includes("/availability") &&
    !pathname.includes("/booking-process") &&
    !pathname.includes("/cancellation-policy") &&
    !pathname.includes("/pricing");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className=" bg-secondary">
        <section className="mt-32 ">
          {isBookingFlow && <StepsNav />}
          {children}
          <div className="container max-w-4xl mx-auto px-4 -mb-12 -mt-24">
            <Navigation />
          </div>
        </section>
      </main>
    </Suspense>
  );
}
