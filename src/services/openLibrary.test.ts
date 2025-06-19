import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchBooks } from "../api/OpenLibrary";
import type { Book } from "../types/Book";

const mockResponse = {
  docs: [
    {
      key: "/works/OL123",
      title: "Valid Book",
      author_name: ["Author"],
      cover_i: 1234,
    },
    {
      key: 123, // invalid key
      title: "Invalid Book",
    },
  ],
};

describe("searchBooks()", () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // reset all mocks before each test
    vi.stubGlobal("fetch", vi.fn()); // mock fetch globally
  });

  it("returns only valid Book items from API", async () => {
    (fetch as any).mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    const books: Book[] = await searchBooks("typescript");

    expect(fetch).toHaveBeenCalled();
    expect(books).toHaveLength(1);
    expect(books[0].title).toBe("Valid Book");
    expect(books[0].key).toBe("/works/OL123");
  });

  it("filters out invalid book entries", async () => {
    (fetch as any).mockResolvedValueOnce({
      json: async () => ({
        docs: [
          { key: 123, title: 456 }, // Invalid entry
          { key: "/works/OL1", title: "Good Book" }, // Valid
        ],
      }),
    });

    const books = await searchBooks("anything");
    expect(books).toHaveLength(1);
    expect(books[0].title).toBe("Good Book");
  });

  it("returns empty array if API returns no books", async () => {
    (fetch as any).mockResolvedValueOnce({
      json: async () => ({ docs: [] }),
    });

    const books = await searchBooks("gibberish123");
    expect(books).toEqual([]);
  });

  it("handles fetch errors gracefully", async () => {
    (fetch as any).mockRejectedValueOnce(new Error("Network fail"));

    const books = await searchBooks("typescript");
    expect(books).toEqual([]); // Should not crash
  });
});
