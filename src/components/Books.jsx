import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkoutBook, returnBook } from "../API/index";
import "./books.css";

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
    <div className="books-container">
      <h2>Library's Catalog</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="books-list">
        {Array.isArray(books) &&
          books.map((book) => (
            <li key={book.id} className="book-item">
              <Link to={`/books/${book.id}`} className="book-link">
                <img
                  src={book.coverimage}
                  alt={book.title}
                  className="book-cover"
                />
                <div className="book-details">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <p className="book-description">{book.description}</p>
                </div>
              </Link>
              <p className="book-availability">
                Available: {book.available ? "Yes" : "No"}
              </p>
              {isLoggedIn && book.available && (
                <button
                  onClick={() => handleCheckout(book.id)}
                  className="checkout-button"
                >
                  Checkout
                </button>
              )}
              {isLoggedIn && !book.available && (
                <button
                  onClick={() => handleReturn(book.id)}
                  className="return-button"
                >
                  Return
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Books;
