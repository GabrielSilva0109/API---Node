import { Router } from "express"
import SelecaoController from "./app/controllers/SelecaoController.js"

const routes = Router()

//Busca todas as Seleções
routes.get('/selecoes', SelecaoController.index)
routes.get('/selecoes/:id', SelecaoController.show)
routes.post('/selecoes', SelecaoController.store)
routes.delete('/selecoes/:id', SelecaoController.delete)
routes.put('/selecoes/:id', SelecaoController.update)

export default routes