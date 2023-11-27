// Account.jsx
import React, { useEffect, useState } from "react";
import { getUserDetails, checkoutBook, returnReservation } from "../API/index";

const Account = ({ isLoggedIn }) => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const result = await getUserDetails(token);
        setUserDetails(result);
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, [isLoggedIn]);

  const handleCheckout = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      await checkoutBook(token, bookId);

      fetchUserDetails();
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      const reservationId = userDetails.books.find(
        (book) => book.id === bookId
      )?.id;

      if (reservationId) {
        await returnReservation(token, reservationId);

        fetchUserDetails();
      } else {
        console.error("Invalid reservationId");
      }
    } catch (error) {
      console.error("Error during return:", error.message);
    }
  };

  return (
    <div>
      {isLoggedIn && userDetails ? (
        <>
          <h2>Welcome, {userDetails.firstname}!</h2>
          <p>Email: {userDetails.email}</p>

          <h3>Books Checked Out:</h3>
          {userDetails.books && userDetails.books.length > 0 ? (
            <ul>
              {userDetails.books.map((book) => (
                <li key={book.id}>
                  {book.title}
                  <button onClick={() => handleReturn(book.id)}>Return</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No books checked out.</p>
          )}
        </>
      ) : (
        <p>Please log in to view your account.</p>
      )}
    </div>
  );
};

export default Account;
