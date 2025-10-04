import { query } from "../db/db.js";

export const saveSummary = async (userInput, aiOutput) => {
  const result = await query(
    `INSERT INTO summaries (user_input,ai_output) VALUES ($1,$2) RETURNING *`,
    [userInput, aiOutput]
  );

  return result.rows[0];
};

export const getSummary = async () => {
  const result = await query("SELECT * FROM summaries ORDER BY id DESC");
  return result.rows;
};
