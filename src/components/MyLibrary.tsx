import type { Book } from "../types/Book";
import { motion } from "framer-motion";

interface Props {
  books: Book[];
  onRemove: (key: string) => void;
}

export default function MyLibrary({ books, onRemove }: Props) {
  return (
    <div>
      {books.length === 0 && <p>No books in your library.</p>}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {books.map((book, index) => (
          <motion.div
            key={book.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
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
                <div className="w-20 h-40 bg-gray-100 border border-gray-300 rounded flex flex-col justify-between items-center px-2 py-2 mb-2">
                  <div className="flex-1 flex items-center justify-center">
                    <h3 className="font-semibold text-[10px] leading-snug break-words line-clamp-3">
                      {book.title}
                    </h3>
                  </div>
                  {book.author_name?.[0] && (
                    <div className="h-[20%]">
                      <p className="text-[9px] text-gray-500 truncate">
                        {book.author_name[0]}
                      </p>
                    </div>
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
              onClick={() => onRemove(book.key)}
              className="mt-4 w-full py-2 text-sm font-semibold text-black bg-white rounded-md hover:bg-black hover:text-white  transition"
            >
              Remove
            </button>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}
