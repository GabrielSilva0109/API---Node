import conexao from "../database/conexao.js"

class SelecaoRepository {

    create(selecao) {
        const sql = "insert into selecoes SET ?;"
        return new Promise((resolve, reject) =>{
            conexao.query(sql, selecao,(erro, resultado)=>{
                if(erro) return reject('Não foi possivel cadastrar!')
                const row = JSON.parse(JSON.stringify(resultado))
                return resolve(row)
            })
        })
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

    update(selecao, id) {
        const sql = "UPDATE selecoes SET ? WHERE id = ?;"
        return new Promise((resolve, reject) =>{
            conexao.query(sql,[selecao, id] ,(erro, resultado)=>{
                if(erro) return reject('Não foi possivel Atualizar!')
                const row = JSON.parse(JSON.stringify(resultado))
                return resolve(row)
            })
        })
    }

    delete(id) {
        const sql = "DELETE FROM selecoes WHERE id = ?"
        return new Promise((resolve, reject) =>{
            conexao.query(sql,id, (erro, resultado)=>{
                if(erro) return reject('Não foi possivel Deletar')
                const row = JSON.parse(JSON.stringify(resultado))
                return resolve(row)
            })
        })
    }
}

export default new SelecaoRepository