import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { getSummary, saveSummary } from "../controller/summaryController.js";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
          parameters: { min_length: 20, max_length: 100 },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("HF API Error:", errText);
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    const summary = data[0]?.summary_text || "No summary available";

    const saved = await saveSummary(text, summary);
    res.json(saved);

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});


router.get("/", async (req, res) => {
  try {
    const summaries = await getSummary();
    res.status(200).json(summaries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch summaries" });
  }
});

export default router;
