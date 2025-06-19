import { isValidBook } from "../utils/validateBooks";
import type { Book } from "../types/Book";

export const searchBooks = async (query: string): Promise<Book[]> => {
  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=title:${encodeURIComponent(
        query
      )}&fields=key,title,author_name,cover_i&limit=20`
    );
    const data = await res.json();
    const validBooks: Book[] = data.docs.filter(isValidBook);
    return validBooks.map((b) => ({
      key: b.key,
      title: b.title,
      author_name: b.author_name,
      cover_i: b.cover_i,
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    return []; // fail safely
  }
};

// export const searchBooks = async (query: string): Promise<Book[]> => {
//   const res = await fetch(
//     `https://openlibrary.org/search.json?q=title:${encodeURIComponent(
//       query
//     )}&fields=key,title,author_name,cover_i&limit=18`
//   );

//   const data = await res.json();

//   const validBooks: Book[] = data.docs.filter(isValidBook);

//   const books: Book[] = validBooks.map((item) => ({
//     key: item.key,
//     title: item.title,
//     author_name: item.author_name,
//     cover_i: item.cover_i,
//   }));

//   return books;
// };
