import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to BookBuddy Library</h1>
      <p>Discover and explore a wide range of books in our catalog.</p>

      <div>
        <Link to="/books">
          <button>Explore Catalog</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
