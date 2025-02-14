export function isDateRangeOverlapping(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
    return start1 <= end2 && end1 >= start2
  }
  
  export async function checkAvailability(
    startDate: string,
    endDate: string,
    apartmentName: string,
    excludeReservationId?: number,
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `/api/check-availability?` +
          new URLSearchParams({
            startDate,
            endDate,
            apartmentName,
            ...(excludeReservationId ? { excludeReservationId: excludeReservationId.toString() } : {}),
          }),
      )
  
      if (!response.ok) {
        throw new Error("Failed to check availability")
      }
  
      const { available } = await response.json()
      return available
    } catch (error) {
      console.error("Error checking availability:", error)
      throw error
    }
  }
  
  