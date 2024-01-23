import conexao from "../database/conexao.js"

class SelecaoRepository {

    create() {
        
    }

    findAll() {
        const sql = "select * from selecoes;"
        return new Promise((resolve, reject) =>{
            conexao.query(sql, (erro, resultado)=>{
                if(erro) return reject('Não foi possivel localizar')
                const row = JSON.parse(JSON.stringify(resultado))
                return resolve(row)
            })
        })
    }

    findById() {
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
    }

    update() {

    }

    delete() {

    }
}

export default new SelecaoRepository