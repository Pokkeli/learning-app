import { useEffect, useState } from "react";
import LearningEntry from "../components/LearningEntry";
import { useLearningStore } from "../store/useLearningStore";
import { loadEntries } from "../api/entries";


function EntriesPage() {
  const studentName: string = "Nico Poutanen";
  
  // Local state because these form values are only used by this form.
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [learned, setLearned] = useState("");
  const [confidence, setConfidence] = useState(3);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const entries = useLearningStore((state) => state.entries);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    loadEntries().catch(() => {
      setLoadError("Could not load entries from the backend.");
    });
  }, []);


  async function loadServerEntries() {
    setLoadError("");
    try {
      await loadEntries();
    } catch (error) {
      setLoadError("Could not load entries from the backend.");
      throw error;
    }
  }

  async function handleAddEntry() {
    setMessage("");
    setError("");

    // 1. Validate the input values.
    if (
      topic.trim() === "" ||
      date === "" ||
      learned.trim() === "" ||
      category.trim() === ""
    ) {
      setError("All fields must be filled in.");
      return;
    }
    if (confidence < 1 || confidence > 5) {
      setError("Confidence must be between 1 and 5.");
      return;
    }

    // 2. Create the entry from the current form values. MariaDB generates the id.
    const newEntry = {
      topic,
      date,
      learned,
      confidence: Number(confidence),
      category,
    };

    // 3. Send the new entry to the backend.
    try {
      const response = await fetch("http://localhost:3001/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      if (!response.ok) throw new Error("Could not save entry");
    } catch {
      setMessage("Saving failed. Please try again.");
      return;
    }

    // 4. Reset the form fields.
    setTopic("");
    setDate("");
    setLearned("");
    setConfidence(3);
    setCategory("");

    // 5. Refresh the list from the backend.
    try {
      await loadServerEntries();
      setMessage("Entry saved successfully.");
    } catch {
      setMessage("Entry was saved, but the list could not be refreshed.");
    }
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
        {message && <p>{message}</p>}
      </form>

      <section>
        <h2>Entries from the backend</h2>
        <button
          type="button"
          onClick={() => {
            void loadServerEntries().catch(() => {});
          }}
        >
          Load from backend
        </button>
        {loadError && <p>{loadError}</p>}
        {entries.map((entry) => (
          <LearningEntry key={entry.id} entry={entry} />
        ))}
      </section>
    </main>
  );
}

export default EntriesPage;
