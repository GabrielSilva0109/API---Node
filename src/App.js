//Importar Express
import express from 'express'
import conexao from '../infra/conexao.js'


//Criar uma instancia
const app = express()

//Indica para o express ler o body com json
app.use(express.json())

function buscarSelecaoPorId(id){
    return selecoes.filter(selecao => selecao.id == id)
}

function buscarIndexSelecao(id){
    return selecoes.findIndex(selecao => selecao.id == id)
}

//Busca todas as Seleções
app.get('/selecoes', (req, res) => {
    //response.status(200).send({selecoes})
    const sql = "select * from selecoes;"
    conexao.query(sql, (erro, resultado) => {
        if(erro){
            console.log(erro)
            res.status(404).json({'erro': erro})
        } else {
            res.status(200).json(resultado)
        }
    })
})

//Busca por ID
app.get('/selecoes/:id', (req, res) =>{
    //res.json(buscarSelecaoPorId(req.params.id))
    const id = req.params.id
    const sql = "select * from selecoes where id = ?;"
    conexao.query(sql, id, (erro, resultado) => {
        const linha = resultado[0]
        if(erro){
            console.log(erro)
            res.status(404).json({'erro': erro})
        } else {
            res.status(200).json(linha)
        }
    })
})

app.post('/selecoes', (req, res) =>{
    //selecoes.push(req.body)
    //res.status(201).send('Seleção cadastrada!')
    const selecao = req.body
    const sql = "insert into selecoes SET ?;"
    conexao.query(sql, selecao, (erro, resultado) => {
        if(erro){
            console.log(erro)
            res.status(404).json({'erro': erro})
        } else {
            res.status(201).json(resultado)
        }
    })
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