//Importar Express
const express = require('express')

//Criar uma instancia
const app = express()

//Definir a Porta
const port = 3000

//Criar rota Padrão
//Passar dois parametros "req" "res" = Requisição e Resposta
app.get('/', (req, res) =>{
    res.send('Ola mundo !')
})

//Escutar a porta 
app.listen(port, () => {
    console.log(`Servidor rodando na endereço http://localhost:${port}`)
})