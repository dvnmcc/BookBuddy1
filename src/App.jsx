import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Books from "./components/Books";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Layout from "./components/Layout";
import { useEffect } from "react";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    // Check if a token exists in localStorage to determine if the user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account"
            element={<Account isLoggedIn={isLoggedIn} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
