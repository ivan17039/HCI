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
} from "date-fns";

interface BookingCalendarProps {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onDateSelect: (date: Date) => void;
  apartment: { id: string; name: string };
  minDate: Date;
  reservations: { apartmentName: string; startDate: string; endDate: string }[];
}

export const BookingCalendar = ({
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
  minDate = new Date(),
}: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const isDateSelectable = (date: Date) => {
    // Don't allow past dates
    if (isBefore(date, minDate) && !isSameDay(date, minDate)) return false;
    return true;
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
          const isSelectable = isDateSelectable(day);
          const isSelected = isDateSelected(day);

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
                ${isSelectable && !isSelected ? "hover:bg-blue-100" : ""}
                ${
                  isSelected
                    ? "bg-primary text-white hover:bg-primaryHover"
                    : ""
                }
                ${!isSelectable ? "text-gray-400 cursor-not-allowed" : ""}
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
    </div>
  );
};
