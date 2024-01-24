import conexao, { consulta } from "../database/conexao.js"

class SelecaoRepository {

    create(selecao) {
        const sql = "insert into selecoes SET ?;"
        return consulta(sql, selecao, 'Não foi possivel Cadastrar!')
    }

    findAll() {
        const sql = "select * from selecoes;"
        return consulta(sql, 'Não foi possivel Encontrar!')
    }

    findById(id) {
        const sql = "select * from selecoes where id = ?;"
        return consulta(sql, id, 'Não foi possivel Encontrar!')
    }

    update(selecao, id) {
        const sql = "UPDATE selecoes SET ? WHERE id = ?;"
        return consulta(sql, [selecao, id], 'Não foi possivel Atualizar!')
    }

    delete(id) {
        const sql = "DELETE FROM selecoes WHERE id = ?"
        return consulta(sql, id, 'Não foi possivel Deletar!')
    }
}

export default new SelecaoRepository