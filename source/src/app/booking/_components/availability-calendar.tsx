"use client";

import { useState } from "react";
import {
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  isWithinInterval,
} from "date-fns";

interface Reservation {
  apartmentName: string;
  startDate: string;
  endDate: string;
}

interface AvailabilityCalendarProps {
  apartmentName: string;
  reservations: Reservation[];
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  reservations,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const isDateBooked = (date: Date) => {
    return reservations.some((reservation) => {
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);
      return (
        isWithinInterval(date, { start, end }) ||
        isSameDay(date, start) ||
        isSameDay(date, end)
      );
    });
  };

  // Get first day of month offset
  const firstDayOffset = startOfMonth(currentMonth).getDay();

  // Get all days in current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Create array for empty cells before first day
  const emptyDays = Array(firstDayOffset).fill(null);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="text-primary hover:text-primaryHover transition-colors"
          >
            ← Prev
          </button>
          <h3 className="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          <button
            onClick={nextMonth}
            className="text-primary hover:text-primaryHover transition-colors"
          >
            Next →
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center font-medium text-sm text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="p-2" />
          ))}
          {daysInMonth.map((day, index) => {
            const isBooked = isDateBooked(day);
            return (
              <div
                key={index}
                className={`
                  p-2 text-center text-sm rounded-full transition-colors
                  ${isBooked ? "bg-red-500 text-white" : "hover:bg-gray-100"}
                `}
              >
                {format(day, "d")}
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white border border-gray-300 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
        </div>
        <div className="space-y-1">
          {reservations.map((res, index) => (
            <p key={index} className="text-sm text-red-500">
              {new Date(res.startDate).toLocaleDateString()} -{" "}
              {new Date(res.endDate).toLocaleDateString()}
            </p>
          ))}
          {reservations.length === 0 && (
            <p className="text-sm text-green-500">No bookings yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};
