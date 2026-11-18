# Learning App

## Application Structure

**Pages and components**
- HomePage = works as a simple welcome screen.
- EntriesPage = shows list of entries and the form for adding more. Each entry is shown using LearningEntry component.

**React, Express and MariaDB**
- React = Shows the pages and handles the users interactions.
- Express = Gets requests from React and then reads or saves data into the database.
- MariaDB = Stores the entries in the database so they stay saved after a refresh.

**/entries vs GET /api/entries**
- /entries = frontend route (React). Chooses which page you see in the browser.
- GET /api/entries = backend route (Express). Returns the data entries as JSON and doesn't show a page.

**Why REST**

- The app only handles entries and it only needs simple operations like GET and POST.

## State Management

- **Local state:** the form fields and messages, because only the form uses them.

- **Zustand:** the list of entries, so different pages can share the same list. `loadEntries()` fetches from the backend and puts the data into the store with `setEntries()`.

- **MariaDB:** Zustand resets when you refresh the page, but the database keeps everything saved. So after a refresh I just load the entries again with `GET`.
