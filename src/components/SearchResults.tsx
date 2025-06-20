import type { Book } from "../types/Book";
import { motion } from "framer-motion";

interface Props {
  results: Book[];
  onAdd: (book: Book) => void;
  hasSearched: boolean;
}

export default function SearchResults({ hasSearched, results, onAdd }: Props) {
  return (
    <div>
      {hasSearched && results.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14.25v.008h.008V14.25H12zm-6.75 0a6.75 6.75 0 1113.5 0 6.75 6.75 0 01-13.5 0z"
            />
          </svg>
          <p className="text-lg font-medium">No results found</p>
          <p className="text-sm text-gray-400 mt-1">
            Try another title or author.
          </p>
        </div>
      )}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((book, index) => (
          <motion.div
            key={book.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex flex-col justify-between border bg-gray-200 rounded-lg shadow-md p-3 transition h-120"
          >
            <div className="flex flex-col items-center text-center">
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="w-25 h-auto rounded mb-2"
                />
              ) : (
                <div className="w-24 h-36 bg-gray-100 border border-gray-300 rounded flex flex-col justify-between items-center px-2 py-2 mb-2">
                  <div className="flex-1 flex items-center justify-center">
                    <h3 className="font-semibold text-[10px] leading-snug break-words line-clamp-3">
                      {book.title}
                    </h3>
                  </div>
                  {book.author_name?.[0] && (
                    <p className="text-[9px] text-gray-500 truncate w-full text-center mt-1 overflow-hidden">
                      {book.author_name[0]}
                    </p>
                  )}
                </div>
              )}

              <div>
                <h2 className="text-lg font-semibold">{book.title}</h2>
                {book.author_name && (
                  <p className="text-sm text-gray-600">
                    by {book.author_name.join(", ")}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => onAdd(book)}
              className="mt-4 w-full py-2 text-sm font-semibold text-black bg-white rounded-md hover:bg-black hover:text-white  transition"
            >
              Add to Library
            </button>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}
