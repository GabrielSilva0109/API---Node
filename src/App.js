//Importar Express
import express from 'express'

//Criar uma instancia
const app = express()

//Criar rota Padrão
//Passar dois parametros "req" "res" = Requisição e Resposta
app.get('/', (req, res) => {
    res.send('Curso Node JS')
})


export default app