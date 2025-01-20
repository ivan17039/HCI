import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { hashPassword, signToken } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await db
    .insert(users)
    .values({
      username,
      password: hashedPassword,
    })
    .returning();

  if (!newUser) {
    return res.status(500).json({ error: "Failed to create user." });
  }

  const token = signToken({ userId: newUser[0].id });
  return res.status(201).json({ token });
}