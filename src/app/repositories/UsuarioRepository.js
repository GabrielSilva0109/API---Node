import conexao, { consulta } from "../database/Conexao.js"

class UsuarioRepository {

    create(usuario) {
        const sql = "insert into usuario SET ?;"
        return consulta(sql, usuario, 'Não foi possivel Cadastrar!')
    }

    findAll() {
        const sql = "select * from usuario;"
        return consulta(sql, 'Não foi possivel Encontrar!')
    }

    findById(id) {
        const sql = "select * from usuario where id = ?;"
        return consulta(sql, id, 'Não foi possivel Encontrar!')
    }

    update(usuario, id) {
        const sql = "UPDATE usuario SET ? WHERE id = ?;"
        return consulta(sql, [usuario, id], 'Não foi possivel Atualizar!')
    }

    delete(id) {
        const sql = "DELETE FROM usuario WHERE id = ?"
        return consulta(sql, id, 'Não foi possivel Deletar!')
    }
}

export default new UsuarioRepository