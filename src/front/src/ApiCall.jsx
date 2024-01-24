import React, { useState } from 'react';
import axios from 'axios';

const ApiCall = () => {
  const [dadosDoBanco, setDadosDoBanco] = useState([]);
  const [novoObjeto, setNovoObjeto] = useState({ selecao: '', grupo: '' });

  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:3000/selecoes');
      setDadosDoBanco(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do backend:', error);
    }
  };

  const cadastrarNovoObjeto = async () => {
    try {
      await axios.post('http://localhost:3000/selecoes', novoObjeto);
      fetchDataFromBackend();
      setNovoObjeto({ selecao: '', grupo: '' });
    } catch (error) {
      console.error('Erro ao cadastrar novo objeto:', error);
    }
  };

  const limparDados = () => {
    setDadosDoBanco([]);
  };

  const excluirObjeto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/selecoes/${id}`);
      fetchDataFromBackend();
    } catch (error) {
      console.error('Erro ao excluir objeto:', error);
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
            value={novoObjeto.selecao}
            onChange={(e) => setNovoObjeto({ ...novoObjeto, selecao: e.target.value })}
          />
        </label>
        <br />
        <label>
          Descrição:
          <input
            type="text"
            value={novoObjeto.grupo}
            onChange={(e) => setNovoObjeto({ ...novoObjeto, grupo: e.target.value })}
          />
        </label>
        <br />
        <button type="button" onClick={cadastrarNovoObjeto}>
          Cadastrar Novo Objeto
        </button>
      </form>

      <ul>
        {dadosDoBanco.map((selecao) => (
          <li key={selecao.id}>
            <strong>ID:</strong> {selecao.id}, <strong>Nome:</strong> {selecao.selecao},{' '}
            <strong>Descrição:</strong> {selecao.grupo}
            <button onClick={() => excluirObjeto(selecao.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiCall;
