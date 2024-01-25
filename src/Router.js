import { Router } from "express"
import UsuarioController from "./app/controllers/UsuarioController.js"

const routes = Router()

//Busca todas as Seleções
routes.get('/usuarios', UsuarioController.index)
routes.get('/usuarios/:id', UsuarioController.show)
routes.post('/usuarios', UsuarioController.store)
routes.delete('/usuarios/:id', UsuarioController.delete)
routes.put('/usuarios/:id', UsuarioController.update)

export default routes