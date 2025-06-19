import type { Book } from "../types/Book";

interface Props {
  books: Book[];
  onRemove: (key: string) => void;
}

export default function MyLibrary({ books, onRemove }: Props) {
  return (
    <div>
      {books.length === 0 && <p>No books in your library.</p>}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <li
            key={book.key}
            className="flex flex-col justify-between border bg-gray-200 rounded-lg shadow-md p-3 transition h-100"
          >
            <div>
              {book.cover_i && (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="w-20 h-auto rounded"
                />
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
          </li>
        ))}
      </ul>
    </div>
  );
}
