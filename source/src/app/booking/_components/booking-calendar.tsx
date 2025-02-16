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
  isBefore,
  parseISO,
} from "date-fns";

interface Apartment {
  id: string;
  name: string;
}

interface Reservation {
  apartmentName: string;
  startDate: string;
  endDate: string;
}

interface BookingCalendarProps {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onDateSelect: (date: Date) => void;
  apartment?: Apartment;
  reservations: Reservation[];
  minDate?: Date;
}

export const BookingCalendar = ({
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
  apartment,
  reservations,
  minDate = new Date(),
}: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

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

  const isDateSelectable = (date: Date) => {
    // Don't allow past dates
    if (isBefore(date, minDate) && !isSameDay(date, minDate)) return false;

    // If we're selecting the end date
    if (selectedStartDate && !selectedEndDate) {
      // Don't allow end date before start date
      if (isBefore(date, selectedStartDate)) return false;

      // Check if there are any bookings between start date and this date
      if (apartment) {
        const relevantReservations = reservations.filter(
          (r) => r.apartmentName === apartment.id
        );
        return !relevantReservations.some((reservation) => {
          const reservationStart = parseISO(reservation.startDate);
          const reservationEnd = parseISO(reservation.endDate);
          return (
            isWithinInterval(reservationStart, {
              start: selectedStartDate,
              end: date,
            }) ||
            isWithinInterval(reservationEnd, {
              start: selectedStartDate,
              end: date,
            })
          );
        });
      }
    }

    return !isDateBooked(date);
  };

  const isDateSelected = (date: Date) => {
    if (selectedStartDate && selectedEndDate) {
      return (
        isWithinInterval(date, {
          start: selectedStartDate,
          end: selectedEndDate,
        }) ||
        isSameDay(date, selectedStartDate) ||
        isSameDay(date, selectedEndDate)
      );
    }
    if (selectedStartDate && hoverDate) {
      return (
        isWithinInterval(date, {
          start: selectedStartDate,
          end: hoverDate,
        }) ||
        isSameDay(date, selectedStartDate) ||
        isSameDay(date, hoverDate)
      );
    }
    return selectedStartDate ? isSameDay(date, selectedStartDate) : false;
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayOfMonth = startOfMonth(currentMonth).getDay();
  const emptyDays = Array(firstDayOfMonth).fill(null);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[300px]">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md hover:bg-gray-100"
          type="button"
        >
          Previous
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={nextMonth}
          className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md hover:bg-gray-100"
          type="button"
        >
          Next Month
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-sm text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="h-10" />
        ))}
        {daysInMonth.map((day, index) => {
          const isBooked = isDateBooked(day);
          const isSelectable = isDateSelectable(day);
          const isSelected = isDateSelected(day);
          const isPartOfCurrentReservation =
            selectedStartDate &&
            selectedEndDate &&
            (isWithinInterval(day, {
              start: selectedStartDate,
              end: selectedEndDate,
            }) ||
              isSameDay(day, selectedStartDate) ||
              isSameDay(day, selectedEndDate));
          return (
            <button
              key={index}
              onClick={() => isSelectable && onDateSelect(day)}
              onMouseEnter={() => {
                if (selectedStartDate && !selectedEndDate && isSelectable) {
                  setHoverDate(day);
                }
              }}
              onMouseLeave={() => {
                if (selectedStartDate && !selectedEndDate) {
                  setHoverDate(null);
                }
              }}
              type="button"
              className={`
                  h-10 w-full flex items-center justify-center text-sm rounded-md
                  transition-colors duration-200
                  ${
                    isBooked ? "bg-red-100 text-red-800 cursor-not-allowed" : ""
                  }
                  ${
                    isPartOfCurrentReservation
                      ? "bg-red-300 text-white font-bold hover:bg-red-300"
                      : ""
                  }
                  ${isSelectable && !isSelected ? "hover:bg-blue-100" : ""}
                  ${
                    isSelected ? "bg-blue-500 text-white hover:bg-blue-600" : ""
                  }
                  ${
                    !isSelectable && !isBooked
                      ? "text-gray-400 cursor-not-allowed"
                      : ""
                  }
                  ${isSelectable && !isSelected ? "text-gray-700" : ""}
                  ${
                    isSelectable &&
                    selectedStartDate &&
                    !selectedEndDate &&
                    isWithinInterval(day, {
                      start: selectedStartDate,
                      end: hoverDate || selectedStartDate,
                    })
                      ? "bg-blue-200"
                      : ""
                  }
                `}
              disabled={!isSelectable}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
      {apartment && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-md bg-red-100 border border-red-800 mr-2"></div>
              <span className="text-gray-600">Booked</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-md bg-red-300 text-white font-bold mr-2"></div>
              <span className="text-gray-600">Currently </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-md bg-blue-500 mr-2"></div>
              <span className="text-gray-600">Selectable</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
