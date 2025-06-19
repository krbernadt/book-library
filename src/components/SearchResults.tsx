import type { Book } from "../types/Book";

interface Props {
  results: Book[];
  onAdd: (book: Book) => void;
}

export default function SearchResults({ results, onAdd }: Props) {
  return (
    <div>
      {results.length === 0 && <p>No results</p>}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((book) => (
          <li
            key={book.key}
            className="flex flex-col justify-between border bg-gray-200 rounded-lg shadow-md p-3 transition h-120"
          >
            <div>
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 border border-gray-300 rounded flex flex-col justify-between text-center px-2 py-2">
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
                  <p className="text-sm tet-gray-600">
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
          </li>
        ))}
      </ul>
    </div>
  );
}
