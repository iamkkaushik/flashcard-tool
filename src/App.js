// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlashcardViewer from './components/FlashcardViewer';
import Dashboard from './components/Dashboard';
// import Home from './components/Home';
import './App.css';


function App() {
  return (
    <Router>
      <div className='mcont'>
        <nav >
          <Link to="/" className='homecs'>Home</Link>
          <Link to="/dashboard" className='dashcs'>Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<FlashcardViewer />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
