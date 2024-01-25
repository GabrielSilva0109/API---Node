import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // Verifica se o usuário está logado
  const isUserLoggedIn = location.state && location.state.usuario;

  // Se o usuário não estiver logado, redirecione para outra página
  useEffect(() => {
    if (!isUserLoggedIn) {
      // Redirecione para a página de login (substitua '/login' pelo caminho da sua página de login)
      navigate('/');
    }
  }, [isUserLoggedIn, navigate]);

  // Se o usuário estiver logado, renderize a página Home
  return (
    <div>
      {isUserLoggedIn ? (
        <h2>Bem-vindo à Página Home, {location.state.usuario.nome}</h2>
      ) : null}
      {/* Restante do conteúdo da página */}
    </div>
  );
}

export default Home;
