import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApiCall from './ApiCall.jsx';
import Home from './pages/Home.jsx';
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
  return (
    <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="" element={<ApiCall />} />
          </Routes>
        </Router>
    </ChakraProvider>
    
  );
};

export default App;
