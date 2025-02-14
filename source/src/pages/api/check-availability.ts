import { db } from "@/db/drizzle"
import { reservations } from "@/db/schema"
import type { NextApiRequest, NextApiResponse } from "next"
import { and, or, eq, gt, gte, lt, lte, not } from "drizzle-orm"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { startDate, endDate, apartmentName, excludeReservationId } = req.query

  if (!startDate || !endDate || !apartmentName) {
    return res.status(400).json({ error: "Missing required parameters" })
  }

  try {
    const start = new Date(startDate as string)
    const end = new Date(endDate as string)

    const query = and(
      eq(reservations.apartmentName, apartmentName as string),
      or(
        and(gte(reservations.checkInDate, start), lt(reservations.checkInDate, end)),
        and(gt(reservations.checkOutDate, start), lte(reservations.checkOutDate, end)),
        and(lte(reservations.checkInDate, start), gte(reservations.checkOutDate, end)),
      ),
    )

    // Ako imamo excludeReservationId, isključi tu rezervaciju iz provjere
    const whereCondition = excludeReservationId
      ? and(query, not(eq(reservations.id, Number(excludeReservationId))))
      : query

    const overlappingReservations = await db.select().from(reservations).where(whereCondition).execute()

    return res.status(200).json({
      available: overlappingReservations.length === 0,
    })
  } catch (error) {
    console.error("Error checking availability:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

