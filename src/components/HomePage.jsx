import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";

const HomePage = () => {
  return (
    <div className="container">
      <h1>Welcome to the BookBuddy Library</h1>
      <p>Discover and explore a wide range of books in our catalog.</p>
      <p>Create an account and check out a book today!</p>

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
