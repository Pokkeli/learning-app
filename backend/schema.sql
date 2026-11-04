CREATE TABLE learning_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  entry_date DATE NOT NULL,
  learned TEXT NOT NULL,
  confidence INT NOT NULL,
  category VARCHAR(100) NOT NULL
);

INSERT INTO learning_entries
  (topic, entry_date, learned, confidence, category)
VALUES
  ('REST APIs', '2026-10-30',
   'Express returns JSON to a client.', 3, 'Backend'),
  ('React State', '2026-10-29',
   'State updates the user interface.', 4, 'Frontend');

SELECT * FROM learning_entries;
