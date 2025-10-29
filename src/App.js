import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      setBooks(response.data.items || []);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        📚 Book Finder
      </h1>

      <form onSubmit={searchBooks} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 w-1/2 rounded-l-lg border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => {
          const info = book.volumeInfo;
          return (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={
                  info.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/150x200?text=No+Image"
                }
                alt={info.title}
                className="w-full h-64 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold">{info.title}</h2>
              <p className="text-sm text-gray-600">
                {info.authors ? info.authors.join(", ") : "Unknown Author"}
              </p>
              <p className="text-sm mt-2">
                {info.description
                  ? info.description.substring(0, 100) + "..."
                  : "No description available."}
              </p>
              <a
                href={info.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 mt-2 inline-block"
              >
                Preview →
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
