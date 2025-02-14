"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";

const steps = [
  { name: "Dates", path: "/booking" },
  { name: "Room", path: "/booking/room" },
  { name: "Contact", path: "/booking/contact-data" },
  { name: "Payment", path: "/booking/payment" },
];

export function StepsNav() {
  const pathname = usePathname();
  const { isStepCompleted } = useBookingStore();
  const currentStepIndex = steps.findIndex((step) => step.path === pathname);

  return (
    <nav className="w-full max-w-4xl mx-auto mb-8 mt-10 px-4">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = isStepCompleted(step.name.toLowerCase());
          const isCurrent = index === currentStepIndex;
          const isClickable = index <= currentStepIndex || isCompleted;

          return (
            <li key={step.name} className="relative flex-1">
              <div className="flex items-center">
                {isClickable ? (
                  <Link
                    href={step.path}
                    className={`flex flex-col items-center text-sm font-medium 
                      ${isCurrent ? "text-primary" : "text-gray-500"}`}
                  >
                    <StepIndicator
                      isCompleted={isCompleted}
                      isCurrent={isCurrent}
                      stepNumber={index + 1}
                    />
                    <span className="absolute -bottom-6 whitespace-nowrap">
                      {step.name}
                    </span>
                  </Link>
                ) : (
                  <div
                    className={`flex flex-col items-center text-sm font-medium text-gray-300`}
                  >
                    <StepIndicator
                      isCompleted={false}
                      isCurrent={false}
                      stepNumber={index + 1}
                    />
                    <span className="absolute -bottom-6 whitespace-nowrap">
                      {step.name}
                    </span>
                  </div>
                )}
                {index < steps.length - 1 && (
                  <div
                    className={`h-[2px] flex-1 mx-2 
                      ${
                        index < currentStepIndex ? "bg-primary" : "bg-gray-300"
                      }`}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StepIndicator({
  isCompleted,
  isCurrent,
  stepNumber,
}: {
  isCompleted: boolean;
  isCurrent: boolean;
  stepNumber: number;
}) {
  return (
    <span
      className={`flex items-center justify-center w-8 h-8 mb-2 rounded-full border-2 
        ${
          isCompleted
            ? "border-primary bg-primary text-white"
            : isCurrent
            ? "border-primary bg-white text-primary"
            : "border-gray-300 bg-white text-gray-500"
        }`}
    >
      {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
    </span>
  );
}
