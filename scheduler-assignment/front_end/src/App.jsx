import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './components/BookingPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:url" element={<BookingPage />} />
        <Route path="*" element={<div className="text-center mt-5">404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
