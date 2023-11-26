/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import React, { useState, useEffect } from "react";
import { getUserDetails } from "../API/index.js";

const Account = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsData = await getUserDetails();

        setUserDetails(userDetailsData);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      <h2>Account Details</h2>
      {loading && <p>Loading account details...</p>}
      {!loading && userDetails ? (
        <div>
          <p>Welcome, {userDetails.firstname}!</p>
          <p>Email: {userDetails.email}</p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>
          To view your account details, please{" "}
          <strong>log in or create an account</strong>.
        </p>
      )}
    </div>
  );
};

export default Account;
