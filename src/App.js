//Importar Express
import express from 'express'
import routes from './Router.js'

//Criar uma instancia
const app = express()

app.use(routes)

//Indica para o express ler o body com json
app.use(express.json())


export default app