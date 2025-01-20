import { db } from "@/db/drizzle"; // Konekcija na bazu
import { users, reservations } from "@/db/schema"; // Tablice 'users' i 'reservations'
import { compare } from "bcrypt"; // Za usporedbu lozinki
import jwt from "jsonwebtoken"; // Za generiranje JWT tokena
import type { NextApiRequest, NextApiResponse } from "next";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Provjera postoji li korisnik
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username)) // Korištenje `eq` za usporedbu
      .execute();

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // Provjera lozinke
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // Provjera je li JWT_SECRET definiran
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET is not defined in the environment variables." });
    }

    // Generiranje JWT tokena
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Dohvaćanje rezervacija korisnika
    const userReservations = await db
      .select()
      .from(reservations)
      .where(eq(reservations.userId, user.id))
      .execute();

    return res.status(200).json({ token, reservations: userReservations });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}