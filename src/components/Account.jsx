import React, { useEffect, useState } from "react";
import { getUserDetails } from "../API/index";

const Account = ({ isLoggedIn }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Assuming you have the user's token stored in localStorage
        const token = localStorage.getItem("token");

        console.log("Fetching user details with token:", token);

        if (token) {
          const result = await getUserDetails(token);
          console.log("User details fetched successfully:", result);
          setUserDetails(result);
        }
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, [isLoggedIn]);

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
                <li key={book.id}>{book.title}</li>
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
