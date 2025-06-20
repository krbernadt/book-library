import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResults";
import type { Book } from "./types/Book";
import { searchBooks } from "./api/OpenLibrary";
import MyLibrary from "./components/MyLibrary";
import { AnimatePresence, motion } from "framer-motion";
import ManualBookForm from "./components/ManualBookForm";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

function App() {
  const [showManualForm, setShowManualForm] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setHasSearched(true);
    const books = await searchBooks(query);
    setResults(books);
    setLoading(false);
  };

  const addToLibrary = (book: Book) => {
    if (!myLibrary.some((b) => b.key === book.key)) {
      const updatedLibrary = [...myLibrary, book];
      setMyLibrary(updatedLibrary);
      setMyLibrary([...myLibrary, book]);
    }

    toast.success("Book added to your library");
  };

  const removeFromLibrary = (key: string) => {
    setMyLibrary(myLibrary.filter((b) => b.key !== key));
    toast.error("Book removed from library");
  };

  return (
    <>
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

        <AnimatePresence mode="wait">
          {viewMode === "search" ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <SearchBar
                  onSearch={handleSearch}
                  onAddManual={() => setShowManualForm(true)}
                />
              </div>

              {showManualForm && (
                <ManualBookForm
                  onAdd={addToLibrary}
                  onClose={() => setShowManualForm(false)}
                />
              )}

              {loading ? (
                <div className="flex justify-center items-center mt-4">
                  <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {results.length > 0 && (
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">
                      Search Results
                    </h2>
                  )}
                  <SearchResult
                    results={results}
                    onAdd={addToLibrary}
                    hasSearched={hasSearched}
                  />
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {myLibrary.length > 0 ? (
                <MyLibrary books={myLibrary} onRemove={removeFromLibrary} />
              ) : (
                <p className="text-center text-gray-500">No books added yet.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
