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

    findById(id) {
        const sql = "select * from selecoes where id = ?;"
        return new Promise((resolve, reject) =>{
            conexao.query(sql,id, (erro, resultado)=>{
                if(erro) return reject('Não foi possivel localizar')
                const row = JSON.parse(JSON.stringify(resultado))
                return resolve(row)
            })
        })
    }

    update() {

    }

    delete() {

    }
}

export default new SelecaoRepository