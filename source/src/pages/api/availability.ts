import { db } from "@/db/drizzle"
import { reservations } from "@/db/schema"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    // Dohvaćanje svih rezerviranih perioda
    const allReservations = await db
      .select({
        apartmentName: reservations.apartmentName,
        startDate: reservations.checkInDate,
        endDate: reservations.checkOutDate,
      })
      .from(reservations)
      .execute()

    return res.status(200).json(allReservations)
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return res.status(500).json({ error: "Failed to fetch reservations" })
  }
}

