import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast,  } from 'react-toastify';

import { Button, ButtonGroup,Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dadosDoBanco, setDadosDoBanco] = useState([]);

  // Verifica se o usuário está logado
  const isUserLoggedIn = location.state && location.state.usuario;

  // Se o usuário não estiver logado, redirecione para outra página
  useEffect(() => {
    if (!isUserLoggedIn) {
      // Redirecione para a página de login (substitua '/login' pelo caminho da sua página de login)
      navigate('/');
    }
  }, [isUserLoggedIn, navigate]);

  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setDadosDoBanco(response.data);
      // Notificação de sucesso
      toast.success('Dados carregados com sucesso!', { autoClose: 2000 });
    } catch (error) {
      console.error('Erro ao buscar dados do backend:', error);
      // Notificação de erro
      toast.error('Erro ao buscar dados do backend!');
    }
  };
  
  const limparDados = () => {
    setDadosDoBanco([]);
  };

  const excluirObjeto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${id}`);
      fetchDataFromBackend();
      // Notificação de sucesso
      toast.success('Usuário excluído com sucesso!', { autoClose: 2000 });
    } catch (error) {
      console.error('Erro ao excluir Usuário:', error);
      // Notificação de erro
      toast.error('Erro ao excluir Usuário!');
    }
  };

  return (
    <div>
      {isUserLoggedIn && <h2>Bem-vindo à Página Home, {location.state.usuario.nome}</h2>}

      {/* Botões */}
      <Button margin='10px' onClick={fetchDataFromBackend} colorScheme='teal' size='md'>
        Lista de Usuários
      </Button>
      <Button margin='10px' onClick={limparDados} colorScheme='teal' size='md'>
        Limpar
      </Button>

      {/* Lista de usuários */}
      <ul className="list-disc">
        {dadosDoBanco.map((usuario) => (
          <li key={usuario.id} className="my-2">
            <strong>ID:</strong> {usuario.id}, <strong>Nome:</strong> {usuario.nome},{' '}
            <strong>Email:</strong> {usuario.email}, <strong>CPF:</strong> {usuario.cpf},{' '}
            <strong>Senha:</strong> {usuario.senha}, <strong>Telefone:</strong> {usuario.telefone}
            <button
              className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
              onClick={() => excluirObjeto(usuario.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>

      <Tabs position="relative" variant="unstyled">
    <TabList>
      <Tab>One</Tab>
      <Tab>Two</Tab>
      <Tab>Three</Tab>
    </TabList>
    <TabIndicator
      mt="-1.5px"
      height="2px"
      bg="blue.500"
      borderRadius="1px"
    />
    <TabPanels>
      <TabPanel>
        <p>one!</p>
      </TabPanel>
      <TabPanel>
        <p>two!</p>
      </TabPanel>
      <TabPanel>
        <p>three!</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
    </div>
  );
}

export default Home;
