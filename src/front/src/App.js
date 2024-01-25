import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApiCall from './ApiCall.jsx';
import Home from './pages/Home.jsx';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="" element={<ApiCall />} />
      </Routes>
    </Router>
  );
};

export default App;
