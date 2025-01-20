// filepath: /c:/Users/Ivan/Desktop/FAX/4.god/Korisnička sučelja/HCI/source/src/db/testDbConnection.mts
import pkg from "pg";
import { config } from "dotenv";

const { Pool } = pkg; // Izvuci Pool iz default eksportiranog paketa

config({ path: ".env" });

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("Uspješna veza s bazom podataka!");
    client.release();
  } catch (error) {
    console.error("Greška prilikom spajanja na bazu podataka:", error);
  } finally {
    await pool.end();
  }
})();