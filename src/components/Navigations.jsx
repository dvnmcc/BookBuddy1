// Navigations.jsx

import React from "react";
import { Link } from "react-router-dom";

const Navigations = ({ isLoggedIn }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link to="/account">Account</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigations;
