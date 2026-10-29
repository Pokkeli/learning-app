type LearningEntryProps = {
  topic: string;
  date: string;
  learned: string;
  confidence: number;
  category: string;
};

function LearningEntry({ topic, date, learned, confidence, category }: LearningEntryProps) {
  return (
    <article>
      <h2>{topic}</h2>
      <p>Date: {date}</p>
      <p>Category: {category}</p>
      <p>{learned}</p>
      <p>Confidence: {confidence} / 5</p>
    </article>
  );
}

export default LearningEntry;
