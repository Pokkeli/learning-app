import LearningEntry from "./components/LearningEntry";

function App() {
  const studentName: string = "Nico Poutanen";

  return (
    <main>
      <h1>My Learning</h1>
      <p>Fullstack Project</p>
      <p>Student: {studentName}</p>

      <LearningEntry
        topic="React Components"
        date="2026-10-19"
        learned="Components help divide the UI into reusable parts."
        confidence={3}
        category="Frontend"
      />

      <LearningEntry
        topic="TypeScript Props"
        date="2026-10-29"
        learned="Props types make sure a component receives the right kind of data."
        confidence={4}
        category="TypeScript"
      />
    </main>
  );
}

export default App;
