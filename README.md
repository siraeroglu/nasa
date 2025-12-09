# NASA Image and Video Explorer

A lightweight React application that allows users to search NASA’s public media library (images and videos) by keyword.
This project was built as part of a frontend technical challenge, with a strong focus on clean and maintainable code, clear project structure, and a simple, user-friendly interface.

---

## Live Demo

https://siraeroglu.github.io/nasa/

---

## Tech Stack

- **React (Vite)** – Fast development environment and optimized build setup
- **React Router** – Client-side routing and URL-based state management
- **NASA Images & Video API** – Public API used for fetching media data
- **Plain CSS** – Custom styling without any UI frameworks
- **Vitest + React Testing Library** – Basic unit and integration tests

---

## Features

- Search NASA’s media library by keyword
- Support for **both images and videos**
- Detail page with a large preview and full description
- Pagination powered by NASA API’s built-in `page` parameter
- URL-based state management (`?q=moon&page=2&media=image`)
  → Refresh, browser back, and forward navigation work naturally
- Loading indicator during data fetch
- Clear and friendly empty-state messages when no results are found
- Basic automated tests covering core functionality

---

## UI Details

- Clean and minimal layout
- Hero section with helpful search suggestions
- Gradient action buttons (search, pagination, back)
- Responsive media cards that adapt to different screen sizes
- Centered NASA logo on the initial empty screen
- Subtle dotted background to give a soft “space-inspired” feel

---

## Getting Started

```bash
# install dependencies
npm install

# start development server
npm run dev

```

-The app will run at:http://localhost:5173

---

## Running Tests

This project includes two simple but meaningful tests written with Vitest and React Testing Library.

What the tests cover

- **Submitting an empty search**
  → The user should see a friendly validation message.

- **Searching for a nonsense word**
  → Since NASA returns no items, the UI should display a clear “no results found” state.

To keep tests fast and reliable, the NASA API service (`searchNasaImages`) is mocked so it always returns an empty list during test runs.

## Run tests

```bash
npm test
```

---

## API Notes

This application uses NASA’s public **Images & Video API**:

**Base URL:**
https://images-api.nasa.gov/search

### Fields used in this project

- `data[0].title`
- `data[0].description`
- `data[0].date_created`
- `data[0].media_type`
- `links[0].href` — thumbnail URL

### Query parameters sent to NASA

- **`q`** → search keyword
- **`page`** → forwarded directly for NASA’s built-in pagination
- **`media_type`** → `"image"`, `"video"`, or both

The main service function (`searchNasaImages`) is intentionally small and easy to follow, handling URL construction, query parameters, API calls, and simple media filtering in a clean and maintainable way.

## Project Structure (Simplified)

```txt
src/
├── assets/
├── components/
│   ├── MediaCard.jsx
│   └── SearchBar.jsx
├── pages/
│   ├── SearchPage.jsx
│   ├── SearchPage.test.jsx
│   └── DetailPage.jsx
├── services/
│   └── nasaApi.js
├── App.jsx
├── index.css
├── main.jsx
└── setupTests.js

```

---

## Purpose

This project serves as a demonstration of:

- Clean and modular React component structure
- Handling async API requests and data loading states
- Implementing simple routing and pagination
- Thoughtful UI/UX, especially for empty states and error scenarios
- Writing basic automated tests for core behaviors
- Keeping the codebase readable and approachable for beginners

---

## License

This project is intended for **educational and portfolio purposes only**.
The NASA Images & Video API is a public, freely accessible API provided by NASA.

---
