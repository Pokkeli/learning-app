import type { LearningEntryData } from "../types/LearningEntryData";

type LearningEntryProps = {
  entry: LearningEntryData;
};

function LearningEntry({ entry }: LearningEntryProps) {
  return (
    <article>
      <h2>{entry.topic}</h2>
      <p>Date: {entry.date}</p>
      <p>Category: {entry.category}</p>
      <p>{entry.learned}</p>
      <p>Confidence: {entry.confidence} / 5</p>
    </article>
  );
}

export default LearningEntry;
