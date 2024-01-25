import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const usuario = location.state && location.state.usuario;

  // Agora você pode usar as informações do usuário conforme necessário

  return (
    <div>
      <h2>Bem-vindo à Página Home, {usuario ? usuario.nome : 'Usuário'}</h2>
      {/* Restante do conteúdo da página */}
    </div>
  );
}

export default Home
