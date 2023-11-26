// In your App.js or wherever you define routes
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/books/:bookId" component={SingleBook} /> */}
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
