import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Center,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

const ApiCall = () => {
  const [dadosDoBanco, setDadosDoBanco] = useState([]);
  const [novoObjeto, setNovoObjeto] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    telefone: '',
  });
  const [loginCredenciais, setLoginCredenciais] = useState({
    email: '',
    senha: '',
  });
  const [isLoginPage, setIsLoginPage] = useState(true);

  const navigate = useNavigate();

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
      setNovoObjeto({
        nome: '',
        email: '',
        cpf: '',
        senha: '',
        telefone: '',
      });

      // Notificação de sucesso
      toast.success('Usuário cadastrado com sucesso! Faça login para continuar.', { autoClose: 2000 });

      // Redireciona para a página de login após o cadastro
      setIsLoginPage(true);
    } catch (error) {
      console.error('Erro ao cadastrar novo Usuário:', error);

      // Notificação de erro
      toast.error('Erro ao cadastrar novo Usuário!');
    }
  };

  const realizarLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/login',
        loginCredenciais
      );

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

  const toggleLoginPage = () => {
    setIsLoginPage((prev) => !prev);
  };

  return (
    <Flex
      background='gray.900'
      w='100%'
      h='100vh'
      p='4'
      boxShadow='md'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box w='500px' mx='auto' my='auto' bg='white' p='4' borderRadius='lg' boxShadow='md'>
        <form>
          <h1>{isLoginPage ? 'Login' : 'Cadastro'}</h1>

          <Box>
            <FormControl>
              {isLoginPage ? (
                // Formulário de Login
                <>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type='text'
                    value={loginCredenciais.email}
                    onChange={(e) =>
                      setLoginCredenciais({ ...loginCredenciais, email: e.target.value })
                    }
                  />

                  <FormLabel>Senha</FormLabel>
                  <Input
                    type='text'
                    value={loginCredenciais.senha}
                    onChange={(e) =>
                      setLoginCredenciais({ ...loginCredenciais, senha: e.target.value })
                    }
                  />
                </>
              ) : (
                // Formulário de Cadastro
                <>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    value={novoObjeto.nome}
                    onChange={(e) => setNovoObjeto({ ...novoObjeto, nome: e.target.value })}
                  />

                  <FormLabel>Email</FormLabel>
                  <Input
                    value={novoObjeto.email}
                    onChange={(e) => setNovoObjeto({ ...novoObjeto, email: e.target.value })}
                  />

                  <FormLabel>CPF</FormLabel>
                  <Input
                    value={novoObjeto.cpf}
                    onChange={(e) => setNovoObjeto({ ...novoObjeto, cpf: e.target.value })}
                  />

                  <FormLabel>Telefone</FormLabel>
                  <Input
                    value={novoObjeto.telefone}
                    onChange={(e) =>
                      setNovoObjeto({ ...novoObjeto, telefone: e.target.value })
                    }
                  />

                  <FormLabel>Senha</FormLabel>
                  <Input
                    value={novoObjeto.senha}
                    onChange={(e) => setNovoObjeto({ ...novoObjeto, senha: e.target.value })}
                  />
                </>
              )}
            </FormControl>

            <Center>
              <Button colorScheme='yellow' type='button' margin='10px' onClick={isLoginPage ? realizarLogin : cadastrarNovoObjeto}>
                {isLoginPage ? 'Login' : 'Cadastrar'}
              </Button>
              <Button
                margin='10px'
                onClick={toggleLoginPage}
                colorScheme='teal'
                size='md'
              >
                {isLoginPage ? 'Cadastro' : 'Login'}
              </Button>
            </Center>
          </Box>
        </form>
      </Box>

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Flex>
  );
};

export default ApiCall;
