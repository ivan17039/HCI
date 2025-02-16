import { db } from "@/db/drizzle";
import { reservations } from "@/db/schema";
import { verifyToken } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];

  // Provjera tokena
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token is missing." });
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken || typeof decodedToken === "string" || !decodedToken.userId) {
    return res.status(401).json({ error: "Unauthorized: Invalid token." });
  }

  const userId = decodedToken.userId;

  if (req.method === "POST") {
    const { startDate, endDate, guests, selectedRoom, contactInfo } = req.body;

    if (!startDate || !endDate || !guests || !selectedRoom || !contactInfo) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Dodavanje rezervacije
    await db
      .insert(reservations)
      .values({
        userId,
        apartmentName: selectedRoom.name,
        checkInDate: new Date(startDate),
        checkOutDate: new Date(endDate),
        guests,
        contactName: contactInfo.name,
        contactEmail: contactInfo.email,
        contactPhone: contactInfo.phone,
      })
      .execute();

    return res.status(201).json({ message: "Reservation added successfully." });
  }

  if (req.method === "GET") {
    const { apartmentName } = req.query;

  if (apartmentName) {
    const apartmentReservations = await db
      .select()
      .from(reservations)
      .where(eq(reservations.apartmentName, String(apartmentName))) // Filtrira po apartmentName
      .execute();

    return res.status(200).json(apartmentReservations);
  }
    // Dohvaćanje rezervacija korisnika
    const userReservations = await db
    .select()
    .from(reservations)
    .where(eq(reservations.userId, userId))
    .execute();

  return res.status(200).json(userReservations);
  }

  res.setHeader("Allow", ["POST", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}