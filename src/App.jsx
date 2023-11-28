import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Books from "./components/Books";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Layout from "./components/Layout";
import SingleBook from "./components/SingleBook";
import { useEffect } from "react";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
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
          <Route path="/books/:bookId" element={<SingleBook />} />
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
