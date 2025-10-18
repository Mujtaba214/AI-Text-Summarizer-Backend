import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL, // your full DB URL here
});

db.connect();

db.on("error", (err) => {
  console.error(err);
  process.exit(-1);
});

export const query = (text, params) => db.query(text, params);
