import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResults";
import type { Book } from "./types/Book";
import { searchBooks } from "./api/OpenLibrary";
import MyLibrary from "./components/MyLibrary";

function App() {
  const [viewMode, setViewMode] = useState<"search" | "library">("search");
  const [results, setResults] = useState<Book[]>([]);
  const [myLibrary, setMyLibrary] = useState<Book[]>(() => {
    const stored = localStorage.getItem("myLibrary");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }, [myLibrary]);

  const handleSearch = async (query: string) => {
    const books = await searchBooks(query);
    setResults(books);
  };

  const addToLibrary = (book: Book) => {
    if (!myLibrary.some((b) => b.key === book.key)) {
      const updatedLibrary = [...myLibrary, book];
      setMyLibrary(updatedLibrary);
      setMyLibrary([...myLibrary, book]);
    }
  };

  const removeFromLibrary = (key: string) => {
    setMyLibrary(myLibrary.filter((b) => b.key !== key));
  };

  return (
    <div className="min-h-screen bg-red-50 px-20 mx-auto p-6 space-y-6 ">
      <h1 className="text-3xl font-bold text-center text-black">
        My Book Application
      </h1>

      <div className="flex justify-center mb-6">
        <div className="relative flex w-40 h-10 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-300">
          <div
            className={`absolute top-0 left-0 h-full w-1/2 rounded-full transition-transform duration-300 bg-black ${
              viewMode === "library" ? "translate-x-full" : "translate-x-0"
            }`}
          />

          <button
            onClick={() => setViewMode("search")}
            className={`flex-1 z-10 text-sm font-semibold transition-colors duration-300 ${
              viewMode === "search" ? "text-white" : "text-gray-500"
            }`}
          >
            Search
          </button>

          <button
            onClick={() => setViewMode("library")}
            className={`flex-1 z-10 text-sm font-semibold transition-colors duration-300 ${
              viewMode === "library" ? "text-white" : "text-gray-500"
            }`}
          >
            Library
          </button>
        </div>
      </div>

      {viewMode === "search" && (
        <>
          <SearchBar onSearch={handleSearch} />
          {results.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">
                Search Results
              </h2>
              <SearchResult results={results} onAdd={addToLibrary} />
            </>
          )}
        </>
      )}

      {viewMode === "library" && (
        <>
          {myLibrary.length > 0 ? (
            <MyLibrary books={myLibrary} onRemove={removeFromLibrary} />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
              <p className="text-lg font-semibold">No books in your library</p>
              <p className="text-sm text-gray-400 mt-2">
                Start searching and add books to your collection!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
