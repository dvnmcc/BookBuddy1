// In your App.js or wherever you define routes
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import HomePage from "./components/HomePage";
// Create this component for displaying detailed book view

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/books/:bookId" component={SingleBook} /> */}
        <Route path="/books" element={<Books />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
