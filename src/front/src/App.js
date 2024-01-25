// Importe as dependências necessárias
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApiCall from './ApiCall'; // Ajuste o caminho conforme necessário
import Home from './pages/Home';

// Crie um componente que envolva ApiCall com um Router
const App = () => {
  return (
    <Router>
      {/* Defina suas rotas aqui, se necessário */}
      <Routes>
        <Route path="/" element={<ApiCall />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
