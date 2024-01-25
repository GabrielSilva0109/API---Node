import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ApiCall from './ApiCall.jsx';
import Home from './pages/Home.jsx';

const PrivateRoute = ({ element, isAuthenticated, fallbackPath }) => {
  return isAuthenticated ? element : <Navigate to={fallbackPath} />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated((prev) => !prev);
  };

  return (
    <Routes>
      <Route path="/" element={<ApiCall />} />
      {/* Use o componente PrivateRoute para a rota /home */}
      <PrivateRoute
        path="/home"
        element={<Home />}
        isAuthenticated={isAuthenticated}
        fallbackPath="/"
      />
    </Routes>
  );
};

export default App;
