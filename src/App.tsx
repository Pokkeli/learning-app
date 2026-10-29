import { useState } from "react";
import LearningEntry from "./components/LearningEntry";
import type { LearningEntryData } from "./types/LearningEntryData";

const firstEntry: LearningEntryData = {
  id: 1,
  topic: "React Components",
  date: "2026-10-19",
  learned: "Components help divide the UI into reusable parts.",
  confidence: 3,
  category: "Frontend",
};

const secondEntry: LearningEntryData = {
  id: 2,
  topic: "TypeScript Props",
  date: "2026-10-29",
  learned: "Props types make sure a component receives the right kind of data.",
  confidence: 4,
  category: "TypeScript",
};

const initialEntries: LearningEntryData[] = [firstEntry, secondEntry];

function App() {
  const studentName: string = "Nico Poutanen";

  const [entries, setEntries] = useState<LearningEntryData[]>(initialEntries);

  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [learned, setLearned] = useState("");
  const [confidence, setConfidence] = useState(3);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  function handleAddEntry() {
    // 1. Validate the input values.
    if (topic.trim() === "" || learned.trim() === "") {
      setError("Topic and what you learned cannot be empty.");
      return;
    }
    if (confidence < 1 || confidence > 5) {
      setError("Confidence must be between 1 and 5.");
      return;
    }

    // 2. Create a new LearningEntryData object using the current form values.
    const newEntry: LearningEntryData = {
      id: Date.now(),
      topic: topic.trim(),
      date: date,
      learned: learned.trim(),
      confidence: confidence,
      category: category.trim(),
    };

    // 3. Add the new object to the entries state.
    setEntries((currentEntries) => [...currentEntries, newEntry]);

    // 4. Reset the form fields.
    setTopic("");
    setDate("");
    setLearned("");
    setConfidence(3);
    setCategory("");
    setError("");
  }

  return (
    <main>
      <h1>My Learning</h1>
      <p>Fullstack Project</p>
      <p>Student: {studentName}</p>

      <form>
        <h2>New Learning Entry</h2>

        <div>
          <label htmlFor="topic">Topic</label>
          <input
            id="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="learned">What I learned</label>
          <textarea
            id="learned"
            value={learned}
            onChange={(event) => setLearned(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="confidence">Confidence (1-5)</label>
          <select
            id="confidence"
            value={confidence}
            onChange={(event) => setConfidence(Number(event.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="button" onClick={handleAddEntry}>
          Add entry
        </button>
      </form>

      {entries.map((entry) => (
        <LearningEntry key={entry.id} entry={entry} />
      ))}
    </main>
  );
}

export default App;
