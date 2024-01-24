import express from 'express';
import cors from 'cors';
import routes from './Router.js';

const app = express();

// Use o middleware cors antes de definir as rotas
app.use(cors());

// Indica para o express ler o body com json
app.use(express.json());

// Use as rotas
app.use(routes);

// Definir a Porta
const PORT = process.env.PORT || 3000;

// Escutar a porta
app.listen(PORT, () => {
  console.log(`Servidor rodando na endereço http://localhost:${PORT}`);
});
