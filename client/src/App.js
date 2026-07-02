import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Admin from './components/Admin';
import './App.css';

function App() {
  return (
    <Router>
      {/* Background Animated Blobs */}
      <div className="bg-blobs">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
        <div className="blob-3"></div>
      </div>

      {/* Main Navigation */}
      <Navbar />

      {/* Page Routing */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </Router>
  );
}

export default App;
