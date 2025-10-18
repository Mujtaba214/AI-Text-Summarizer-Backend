import express from "express";
import summarizeRoute from "./routes/summary.js";
import cors from "cors";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.json());
const allowedOrigins = [
  "https://ai-paragraph-summarizer.netlify.app/", // Your deployed frontend URL
  "http://localhost:5173", // Local development URL
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Enable cookies if needed
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello from Backend");
});

app.use("/api/summarize", summarizeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
