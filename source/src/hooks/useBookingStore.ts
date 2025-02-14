import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface BookingData {
  startDate: string
  endDate: string
  guests: number
  selectedRoom?: {
    id: string
    name: string
    price: number
    image: string
  }
  contactInfo?: {
    name: string
    email: string
    phone: string
  }
}

interface BookingStore {
  bookingData: BookingData
  setBookingData: (data: Partial<BookingData>) => void
  clearSelectedRoom: () => void
  clearBookingData: () => void
  isStepCompleted: (step: string) => boolean
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookingData: {
        startDate: "",
        endDate: "",
        guests: 1,
        selectedRoom: undefined,
        contactInfo: undefined,
      },
      setBookingData: (data) => set((state) => ({ bookingData: { ...state.bookingData, ...data } })),
      clearSelectedRoom: () =>
        set((state) => ({
          bookingData: { ...state.bookingData, selectedRoom: undefined },
        })),
      clearBookingData: () =>
        set({
          bookingData: {
            startDate: "",
            endDate: "",
            guests: 1,
            selectedRoom: undefined,
            contactInfo: undefined,
          },
        }),
      isStepCompleted: (step) => {
        const { bookingData } = get()
        switch (step) {
          case "dates":
            return !!bookingData.startDate && !!bookingData.endDate
          case "room":
            return !!bookingData.selectedRoom
          case "contact":
            return !!bookingData.contactInfo
          default:
            return false
        }
      },
    }),
    {
      name: "booking-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

