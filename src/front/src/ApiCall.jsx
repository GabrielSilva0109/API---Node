import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

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
    <div>
      <h1>{isLoginPage ? 'Login' : 'Cadastro de Usuário'}</h1>
      {isLoginPage ? (
        <form>
          <label>
            Email:
            <input
              type="text"
              value={loginCredenciais.email}
              onChange={(e) => setLoginCredenciais({ ...loginCredenciais, email: e.target.value })}
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={loginCredenciais.senha}
              onChange={(e) => setLoginCredenciais({ ...loginCredenciais, senha: e.target.value })}
            />
          </label>
          <button type="button" onClick={realizarLogin}>
            Login
          </button>
        </form>
      ) : (
        <form>
          <label>
            Nome:
            <input
              type="text"
              value={novoObjeto.nome}
              onChange={(e) => setNovoObjeto({ ...novoObjeto, nome: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={novoObjeto.email}
              onChange={(e) => setNovoObjeto({ ...novoObjeto, email: e.target.value })}
            />
          </label>
          <label>
            CPF:
            <input
              type="text"
              value={novoObjeto.cpf}
              onChange={(e) => setNovoObjeto({ ...novoObjeto, cpf: e.target.value })}
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={novoObjeto.senha}
              onChange={(e) => setNovoObjeto({ ...novoObjeto, senha: e.target.value })}
            />
          </label>
          <label>
            Telefone:
            <input
              type="text"
              value={novoObjeto.telefone}
              onChange={(e) => setNovoObjeto({ ...novoObjeto, telefone: e.target.value })}
            />
          </label>
          <button type="button" onClick={cadastrarNovoObjeto}>
            Cadastrar Novo Usuário
          </button>
        </form>
      )}
      <button onClick={toggleLoginPage}>{isLoginPage ? 'Ir para o Cadastro' : 'Ir para o Login'}</button>
      <button onClick={fetchDataFromBackend}>Lista de Usuários</button>
      <button onClick={limparDados}>Limpar</button>
      {/* O restante do código permanece o mesmo */}
      {/* ToastContainer para renderizar as notificações */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <ul>
        {dadosDoBanco.map((usuario) => (
          <li key={usuario.id} >
            <strong>ID:</strong> {usuario.id}, <strong>Nome:</strong> {usuario.nome},{' '}
            <strong>Email:</strong>{usuario.email}
            <strong>CPF:</strong>{usuario.cpf}
            <strong>Senha:</strong>{usuario.senha}
            <strong>Telefone:</strong>{usuario.telefone}
            <button onClick={() => excluirObjeto(usuario.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    
    
    </div>
  );
};

export default ApiCall;
