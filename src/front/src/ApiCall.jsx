import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importe o estilo padrão do react-toastify
import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Center,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  ButtonGroup,
  Input,
  IconButton 
} from '@chakra-ui/react'

const ApiCall = () => {
  const [dadosDoBanco, setDadosDoBanco] = useState([]);
  const [novoObjeto, setNovoObjeto] = useState({ nome: '', email: '', cpf: '', senha: '', telefone: '' });
  const [loginCredenciais, setLoginCredenciais] = useState({ email: '', senha: '' });
  const [isLoginPage, setIsLoginPage] = useState(true);

  // useNavigate para navegação
  const navigate = useNavigate()



  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setDadosDoBanco(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do backend:', error);
    }
  };

  const cadastrarNovoObjeto = async () => {
    try {
      await axios.post('http://localhost:3000/usuarios', novoObjeto);
      fetchDataFromBackend();
      setNovoObjeto({ nome: '', email: '', cpf: '', senha: '', telefone: '' });

      // Notificação de sucesso
      toast.success('Usuário cadastrado com sucesso!', { autoClose: 2000 });
    } catch (error) {
      console.error('Erro ao cadastrar novo Usuário:', error);

      // Notificação de erro
      toast.error('Erro ao cadastrar novo Usuário!');
    }
  };

  const realizarLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', loginCredenciais);
  
      if (response.data && response.data.usuario) {
        // Usuário autenticado, você pode realizar ações adicionais após o login aqui
        navigate('/home', { state: { usuario: response.data.usuario } });
  
        // Notificação de sucesso
        toast.success('Login bem-sucedido!', { autoClose: 2000 });
      } else {
        // Notificação de erro para autenticação falha
        toast.error('Credenciais inválidas!');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
  
      // Notificação de erro geral
      toast.error('Erro durante o login!');
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

  const toggleLoginPage = () => {
    setIsLoginPage((prev) => !prev);
  };

  return (

    <Flex
      background='gray.900'
      width='100%'
      heigth='100%'
      >
      <Center></Center>
      <Box 
      w="500px" // Largura do seu box
      h="400px" // Altura do seu box
      mx="auto" // Margem horizontal automática para centralizar horizontalmente
      my="auto" // Margem vertical automática para centralizar verticalmente
      bg="gray.100" // Cor de fundo do seu box
      p="4" // Preenchimento interno
      borderRadius="lg" // Borda arredondada
      boxShadow="md" // Sombra
      >
      <form className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          {isLoginPage ? 'Login' : 'Cadastro de Usuário'}
        </h1>

        {isLoginPage ? (
          // Formulário de Login
          <Box>
             <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type='text' value={loginCredenciais.email}
               onChange={(e) => setLoginCredenciais({ ...loginCredenciais, email: e.target.value })}/>

              <FormLabel>Senha</FormLabel>
              <Input type='text' value={loginCredenciais.senha}
                onChange={(e) => setLoginCredenciais({ ...loginCredenciais, senha: e.target.value })}/>

            </FormControl>
            <Center>
              <Button colorScheme='yellow' type="button"
                onClick={realizarLogin}>Login</Button>
            </Center> 
           
          </Box>
        ) : (
          // Formulário de Cadastro
          <Box>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input value={novoObjeto.nome}
                onChange={(e) => setNovoObjeto({ ...novoObjeto, nome: e.target.value })}/>
              
              <FormLabel>Email</FormLabel>
              <Input value={novoObjeto.email}
                onChange={(e) => setNovoObjeto({ ...novoObjeto, email: e.target.value })}/>
            
              <FormLabel>CPF</FormLabel>
              <Input value={novoObjeto.cpf}
                onChange={(e) => setNovoObjeto({ ...novoObjeto, cpf: e.target.value })}/>
            
              <FormLabel>Telefone</FormLabel>
              <Input value={novoObjeto.telefone}
                onChange={(e) => setNovoObjeto({ ...novoObjeto, telefone: e.target.value })}/>

              <FormLabel>Senha</FormLabel>
              <Input value={novoObjeto.senha}
                onChange={(e) => setNovoObjeto({ ...novoObjeto, senha: e.target.value })}/>
            
            </FormControl>
            
            <Center>
              <Button colorScheme='yellow'
                type="button"
                onClick={cadastrarNovoObjeto}
              >
                Cadastrar Novo Usuário
              </Button>
            </Center>
            
            
          </Box>
        )}
      </form>
      </Box>
      

     

      <Button margin='10px' onClick={toggleLoginPage} colorScheme='teal' size='md'>{isLoginPage ? 'Ir para o Cadastro' : 'Ir para o Login'}</Button>
      
      <Button margin='10px'onClick={fetchDataFromBackend} colorScheme='teal' size='md'>Lista de Usuários</Button>

      <Button margin='10px' onClick={limparDados} colorScheme='teal' size='md'>Limpar</Button>

      {/* O restante do código permanece o mesmo */}
      {/* ToastContainer para renderizar as notificações */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <ul className="list-disc">
        {dadosDoBanco.map((usuario) => (
          <li key={usuario.id} className="my-2">
            <strong>ID:</strong> {usuario.id}, <strong>Nome:</strong> {usuario.nome},{' '}
            <strong>Email:</strong> {usuario.email}
            <strong>CPF:</strong> {usuario.cpf}
            <strong>Senha:</strong> {usuario.senha}
            <strong>Telefone:</strong> {usuario.telefone}
            <button
              className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
              onClick={() => excluirObjeto(usuario.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>


    
    </Flex>
  );
};

export default ApiCall;