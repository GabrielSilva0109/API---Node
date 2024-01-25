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

    async login(email, senha) {
        const sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?;";
        const result = await consulta(sql, [email, senha], 'Não foi possível realizar o login');
      
        // Verifique se encontrou algum usuário
        if (result.length > 0) {
          return result[0]; // Retorna o usuário encontrado
        } else {
          return null; // Retorna null se não encontrar usuário
        }
    }
}

export default new UsuarioRepository