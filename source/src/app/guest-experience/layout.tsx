import type React from "react";
import { Navigation } from "./_components/navigation";
import { Toaster } from "@/components/toaster";

export default function GuestExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-secondary">
      <main className="flex min-h-screen flex-col items-center p-10 mt-20 ">
        <Navigation />
        {children}
        <Toaster />
      </main>
    </div>
  );
}
