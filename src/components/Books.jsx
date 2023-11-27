// Books.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkoutBook, returnBook } from "../API/index";
const API_BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

const Books = ({ isLoggedIn }) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/books`);
        const result = await response.json();

        if (result && Array.isArray(result.books)) {
          setBooks(result.books);
        } else {
          setError("Invalid response format. Please try again.");
        }
      } catch (error) {
        setError("Failed to fetch books. Please try again.");
      }
    };

    fetchBooks();
  }, []);

  const handleCheckout = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      if (isLoggedIn && token) {
        await checkoutBook(token, bookId);

        fetchBooks();
      } else {
        console.error("User is not authenticated. Cannot perform checkout.");
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      if (isLoggedIn && token) {
        await returnBook(token, bookId);

        fetchBooks();
      } else {
        console.error("User is not authenticated. Cannot perform return.");
      }
    } catch (error) {
      console.error("Error during return:", error.message);
    }
  };

  return (
    <div>
      <h2>Library's Catalog</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {Array.isArray(books) &&
          books.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>
                <h3>{book.title}</h3>
              </Link>
              <p>{book.author}</p>
              <p>{book.description}</p>
              <img
                src={book.coverimage}
                alt={book.title}
                style={{ maxWidth: "150px" }}
              />
              <p>Available: {book.available ? "Yes" : "No"}</p>
              {isLoggedIn && book.available && (
                <button onClick={() => handleCheckout(book.id)}>
                  Checkout
                </button>
              )}
              {isLoggedIn && !book.available && (
                <button onClick={() => handleReturn(book.id)}>Return</button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Books;
