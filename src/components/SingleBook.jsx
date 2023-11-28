import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { checkoutBook } from "../API/index";
import "./singleBook.css";

const API_BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

const SingleBook = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [isBookCheckedOut, setBookCheckedOut] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`);
        const result = await response.json();

        console.log("API Response:", result);

        if (result && result.book) {
          console.log("Book:", result.book);
          setBook(result.book);
        } else {
          setError("Invalid response format. Please try again.");
        }
      } catch (error) {
        setError("Failed to fetch book details. Please try again.");
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      await checkoutBook(token, book.id);

      setBookCheckedOut(true);

      const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching user details: ${response.statusText}`);
      }

      const result = await response.json();

      const updatedUserDetails = {
        ...result,
        reservations: result.reservations || [],
      };

      setUserDetails(updatedUserDetails);
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  return (
    <div className="single-book-container">
      <div className="book-details-container">
        <h2 className="book-title">{book && book.title}</h2>
        <p className="book-author">{book && book.author}</p>
        <p className="book-description">{book && book.description}</p>
        <img
          className="book-cover"
          src={book && book.coverimage}
          alt={book && book.title}
        />
        {isBookCheckedOut ? (
          <p>This book is checked out.</p>
        ) : (
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        )}
        <p>Available: {book && (book.available ? "Yes" : "No")}</p>
      </div>
    </div>
  );
};

export default SingleBook;
