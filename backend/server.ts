import express from "express";
import cors from "cors";

type LearningEntryData = {
  id: number;
  topic: string;
  date: string;
  learned: string;
  confidence: number;
  category: string;
};

const app = express();
app.use(cors());
const PORT = 3001;

const entries: LearningEntryData[] = [
  {
    id: 1,
    topic: "React Components",
    date: "2026-10-22",
    learned: "Components help us reuse UI code.",
    confidence: 3,
    category: "Frontend"
  },
  {
    id: 2,
    topic: "React State",
    date: "2026-10-27",
    learned: "State lets the interface react to changes.",
    confidence: 2,
    category: "Frontend"
  },
  {
    id: 3,
    topic: "Express API",
    date: "2026-10-29",
    learned: "Express can return JSON data from a GET endpoint.",
    confidence: 3,
    category: "Backend"
  }
];

app.get("/api/entries", (req, res) => {
  res.json(entries);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
