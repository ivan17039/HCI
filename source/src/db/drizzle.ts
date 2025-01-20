import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { config } from 'dotenv';

config({ path: '.env' });

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export const db = drizzle(pool);