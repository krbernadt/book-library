import type { Book } from "../types/Book";

export function isValidBook(data: any): data is Book {
  return (
    typeof data === "object" &&
    typeof data.key === "string" &&
    typeof data.title === "string" &&
    (data.author_name === undefined || Array.isArray(data.author_name)) &&
    (data.cover_i === undefined || typeof data.cover_i === "number")
  );
}
