//Importar Express
import express from 'express'
import routes from './Router.js'

//Criar uma instancia
const app = express()

//Indica para o express ler o body com json
app.use(express.json())

//Use routes
app.use(routes)

export default app