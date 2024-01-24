//Importar Express
import express from 'express'
import SelecaoController from './app/controllers/SelecaoController.js'

//Criar uma instancia
const app = express()

//Indica para o express ler o body com json
app.use(express.json())

//Busca todas as Seleções
app.get('/selecoes', SelecaoController.index)
app.get('/selecoes/:id', SelecaoController.show)
app.post('/selecoes', SelecaoController.store)
app.delete('/selecoes/:id', SelecaoController.delete)
app.put('/selecoes/:id', SelecaoController.update)


export default app