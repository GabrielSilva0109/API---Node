import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApiCall = () => {
  const [dadosDoBanco, setDadosDoBanco] = useState([]);
  const [novoObjeto, setNovoObjeto] = useState({ nome: '', email: '', cpf: '', senha: ''});

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
      setNovoObjeto({ usuario: '', email: '', cpf: '', senha: ''});

      // Notificação de sucesso
      toast.success('Usuario cadastrado com sucesso!', { autoClose: 2000 }); // autoClose define o tempo em milissegundos para a notificação fechar automaticamente
    } catch (error) {
      console.error('Erro ao cadastrar novo Usuario:', error);

      // Notificação de erro
      toast.error('Erro ao cadastrar novo Usuario!');
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
      toast.success('Usuario excluído com sucesso!', { autoClose: 2000 });
    } catch (error) {
      console.error('Erro ao excluir objeto:', error);
      // Notificação de erro
      toast.error('Erro ao excluir Usuario!');
    }
  };

  return (
    <div>
      <h1>Exemplo de Chamada de API no React</h1>
      <button onClick={fetchDataFromBackend}>Recarregar Dados do Banco</button>
      <button onClick={limparDados}>Limpar Dados</button>

      <form>
        <label>
          Nome:
          <input
            type="text"
            value={novoObjeto.nome}
            onChange={(e) => setNovoObjeto({ ...novoObjeto, nome: e.target.value })}
          />
        </label>
        <br />
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
            type="text"
            value={novoObjeto.senha}
            onChange={(e) => setNovoObjeto({ ...novoObjeto, senha: e.target.value })}
          />
        </label>

        <br />
        <button type="button" onClick={cadastrarNovoObjeto}>
          Cadastrar Novo Usuario
        </button>
      </form>

      <ul>
        {dadosDoBanco.map((usuario) => (
          <li key={usuario.id}>
            <strong>ID:</strong> {usuario.id}, <strong>Nome:</strong> {usuario.nome},{' '}
            <strong>Email:</strong>{usuario.email}
            <strong>Telefone:</strong>{usuario.telefone}
            <button onClick={() => excluirObjeto(usuario.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      {/* ToastContainer para renderizar as notificações */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default ApiCall;
