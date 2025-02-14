import { db } from "@/db/drizzle"
import { reservations } from "@/db/schema"
import { verifyToken } from "@/lib/auth"
import type { NextApiRequest, NextApiResponse } from "next"
import { eq, and } from "drizzle-orm"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token is missing." })
  }

  const decodedToken = verifyToken(token)
  if (!decodedToken || typeof decodedToken === "string" || !decodedToken.userId) {
    return res.status(401).json({ error: "Unauthorized: Invalid token." })
  }

  const userId = decodedToken.userId
  const { id } = req.query

  if (req.method === "GET") {
    const reservation = await db
      .select()
      .from(reservations)
      .where(and(eq(reservations.id, Number(id)), eq(reservations.userId, userId)))
      .execute()

    if (reservation.length === 0) {
      return res.status(404).json({ error: "Reservation not found." })
    }

    return res.status(200).json(reservation[0])
  }

  if (req.method === "PUT") {
    const { startDate, endDate, guests, status } = req.body

    // Prvo dohvatimo trenutnu rezervaciju
    const currentReservation = await db
      .select()
      .from(reservations)
      .where(and(eq(reservations.id, Number(id)), eq(reservations.userId, userId)))
      .execute()

    if (currentReservation.length === 0) {
      return res.status(404).json({ error: "Reservation not found or you don't have permission to update it." })
    }

    // Provjera je li rezervacija već potvrđena
    if (currentReservation[0].status === "confirmed") {
      return res.status(400).json({ error: "Cannot modify a confirmed reservation." })
    }

    // Ažuriranje rezervacije
    const updatedReservation = await db
      .update(reservations)
      .set({
        checkInDate: startDate ? new Date(startDate) : undefined,
        checkOutDate: endDate ? new Date(endDate) : undefined,
        guests: guests || undefined,
        status: status || "pending", // Ako status nije eksplicitno postavljen, vraćamo na "pending"
      })
      .where(and(eq(reservations.id, Number(id)), eq(reservations.userId, userId)))
      .returning()
      .execute()

    if (updatedReservation.length === 0) {
      return res.status(404).json({ error: "Reservation not found or you don't have permission to update it." })
    }

    return res.status(200).json(updatedReservation[0])
  }

  res.setHeader("Allow", ["GET", "PUT"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}

