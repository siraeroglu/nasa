# NASA Image and Video Explorer

This repository contains a small React application that lets users search NASA’s public media library (images + videos).
I built it as part of a frontend technical challenge, focusing on clean code, clear structure, and a simple, friendly user experience.

---

## Live Demo

https://siraeroglu.github.io/nasa/

---

## Tech Stack

- **React (Vite)** – Fast development environment and optimized build setup
- **React Router** – Client-side routing and URL-based state management
- **NASA Images & Video API** – Public media API
- **Plain CSS** – Hand-written styling, no UI framework
- **Vitest + React Testing Library** – Basic unit and integration tests

---

## Features

- Search NASA’s media library by keyword
- Support for **both images and videos**
- Detail page with a large preview and full description
- Pagination using NASA’s native `page` parameter
- URL-based state management (`?q=moon&page=2&media=image`)
  → Refresh, browser back, and forward navigation work naturally
- Loading indicator during fetch
- Helpful empty-state messages
- A few small automated tests covering core behavior

---

## UI Details

- Clean and minimal layout
- A simple hero section with example search suggestions
- Gradient action buttons (search, pagination, back)
- Responsive media cards
- Centered NASA logo when the page is empty

---

## Getting Started

```bash
# install dependencies
npm install

# start development server
npm run dev

```

- The app will run at:http://localhost:5173

---

## Testing

This project includes two simple but meaningful tests written with Vitest and React Testing Library.

Covered scenarios:

- **Submitting an empty search**
  → A friendly validation message appears.

- **Searching for a nonsense word**
  → NASA returns no items, so the UI shows a clear empty-results state.

To keep tests stable and fast, the searchNasaImages function is mocked during test runs.

## Run tests with:

```bash
npm test
```

---

## API Notes

This app uses NASA’s Images & Video API:

**Base URL:**
https://images-api.nasa.gov/search

### Fields used

- `data[0].title`
- `data[0].description`
- `data[0].date_created`
- `data[0].media_type`
- `links[0].href` — thumbnail URL

### Query parameters sent

- **`q`** → search keyword
- **`page`** → forwarded directly for NASA’s built-in pagination
- **`media_type`** → `"image"`, `"video"`, or both

The searchNasaImages service is intentionally small and easy to follow.
It handles URL construction, query params, the API call, and some basic filtering.

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
- Handling async API requests and data loading/empty/error states
- Simple routing and pagination
- Thoughtful UX for “no results” and other edge cases
- Writing basic automated tests for core behaviors
- A readable, beginner-friendly codebase

---

## Best Practices & Decisions

- Clean and simple folder structure
- Single-responsibility components
- NASA API calls handled in dedicated service functions
- URL-driven state using `useSearchParams`
- Clear loading and error states
- ESLint + Prettier for consistent formatting
- Basic unit tests
- Accessible HTML

---

## License

This project is for educational and portfolio purposes only.
The NASA Images & Video API is a public service provided by NASA.

---
