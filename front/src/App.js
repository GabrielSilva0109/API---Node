// frontend/src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [selecoes, setSelecoes] = useState([]);

  useEffect(() => {
    fetch('/selecoes')  // Rota definida no servidor backend
      .then(response => response.json())
      .then(data => setSelecoes(data))
      .catch(error => console.error('Erro ao obter seleções:', error));
  }, []);

  return (
    <div className="App">
      <h1>Seleções do Backend:</h1>
      <ul>
        {selecoes.map(selecao => (
          <li key={selecao.id}>{selecao.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
