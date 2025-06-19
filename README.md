# Book Library App

A simple and elegant React + TypeScript app to search books from Open Library and build your own personal library — with support for local storage and responsive design.

![screenshot](preview.png) <!-- optional: add a screenshot later -->

---

## 🚀 Features

- 🔍 **Search Books** — by title using the Open Library API
- 📘 **Add to Library** — save books locally in your browser
- 🗑️ **Remove Books** — manage your saved collection
- 💾 **Persistent Storage** — uses `localStorage` to save your data
- 🖼️ **Book Cover & Info** — show title, author, cover (or fallback template)
- 🧭 **Toggle Views** — switch between search mode and library view
- 🌈 **Tailwind Styled** — clean and modern UI

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Open Library API](https://openlibrary.org/developers/api)

---

## 📦 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/krbernadt/book-library.git
   cd book-library
   
2. **Install dependencies**
   ```bash
   npm install

3. **Run the app**
   ```bash
   npm run dev

4. **Open http://localhost:5173 in your browser**

---

## Folder Structure
src/
├── api/              # API call to Open Library
├── components/       # UI components (SearchBar, SearchResults, etc.)
├── types/            # TypeScript interfaces
├── utils/            # Validation or helper functions
└── App.tsx           # Main component

  

