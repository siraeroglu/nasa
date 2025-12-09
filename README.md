# NASA Image and Video Explorer

A small React application that lets users search NASA’s public media library (images and videos) by keyword.
I built this project as part of a frontend coding challenge and focused on writing clean, readable code and a simple, user-friendly UI.

---

## Tech Stack

- **React (Vite)**
- **React Router**
- **NASA Images & Video API**
- **Plain CSS** (no UI frameworks)
- **Vitest + React Testing Library** (basic automated tests)

---

## Features

- Search NASA's media library by keyword
- Supports **both images and videos**
- Detail page with large preview and full description
- Pagination using NASA API’s built-in `page` parameter
- URL reflects search state (`?q=moon&page=2&media=image`)
  → refresh and browser back/forward work naturally
- Loading indicator while fetching
- Friendly empty states for no results
- Basic automated tests for core behaviors

---

## UI Details

- Clean, minimal layout
- Hero section with search suggestions
- Gradient action buttons (search, pagination, back)
- Responsive media cards
- NASA logo centered on the initial empty screen
- Subtle dotted background for a soft “space” feeling

---

## Getting Started

```bash
# install dependencies
npm install

# start development server
npm run dev

```

## The app will run at:http://localhost:5173

## Running Tests

This project includes two simple but meaningful tests written with Vitest and React Testing Library.

What is covered:

Empty search submission
→ The user should see a friendly error message.

Searching a nonsense word
→ NASA returns no items, so the UI should display "no results found".

To keep tests fast and consistent, the NASA API service (searchNasaImages) is mocked so it always returns an empty list during tests.

Run tests with:

```bash
npm test
```

## API Notes

This application uses NASA’s public Images & Video API:

Base URL:
https://images-api.nasa.gov/search

Fields used in this app:

data[0].title

data[0].description

data[0].date_created

data[0].media_type

links[0].href — thumbnail URL

Query parameters sent:

q → the search keyword

page → passed directly to NASA’s pagination

media_type → "image", "video", or both

The service function (searchNasaImages) is intentionally small and easy to follow, with clear logic for building query URLs and filtering media types.

## Project Structure (Simplified)

src/
assets/
components/
MediaCard.jsx
SearchBar.jsx
pages/
SearchPage.jsx
SearchPage.test.jsx
DetailPage.jsx
services/
nasaApi.js
App.jsx
index.css
main.jsx
setupTests.js

---

## Purpose

This project is a demonstration of:

Clean React component structure

Handling async API requests

Simple routing and pagination

UI/UX thinking on empty states and errors

Writing basic automated tests

## Keeping code readable and beginner-friendly

## License

This project is for educational and portfolio purposes only.
The NASA API is public and free to use.

---
