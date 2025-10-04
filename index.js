import express from "express";
import summarizeRoute from "./routes/summary.js";
import cors from "cors";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Backend");
});

app.use("/api/summarize", summarizeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
