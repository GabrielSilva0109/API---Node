//Importar Express
import express from 'express'

//Criar uma instancia
const app = express()

//Indica para o express ler o body com json
app.use(express.json())

//Mock
const selecoes = [
    {id: 1, selecao: 'Brasil', grupo: 'G'},
    {id: 2, selecao: 'Suiça', grupo: 'G'},
    {id: 3, selecao: 'Servia', grupo: 'G'},
    {id: 4, selecao: 'Camarões', grupo: 'G'}
]

function buscarSelecaoPorId(id){
    return selecoes.filter(selecao => selecao.id == id)
}

function buscarIndexSelecao(id){
    return selecoes.findIndex(selecao => selecao.id == id)
}


//Criar rota Padrão
//Passar dois parametros "req" "res" = Requisição e Resposta
app.get('/', (req, res) => {
    res.send('Curso Node JS')
})

app.get('/selecoes', (request, response) => {
    response.status(200).send({selecoes})
})

app.get('/selecoes/:id', (req, res) =>{
    res.json(buscarSelecaoPorId(req.params.id))
})

app.post('/selecoes', (req, res) =>{
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada!')
})

app.delete('/selecoes/:id', (req, res) => {
    let index = buscarIndexSelecao(req.params.id)
    selecoes.splice(index, 1)
    res.send('Seleção excluida!')
})

app.put('/selecoes/:id', (req, res) => {
    let index = buscarIndexSelecao(req.params.id)
    selecoes[index].selecao = req.body.selecao
    selecoes[index].grupo = req.body.grupo
    res.json(selecoes)
})


export default app