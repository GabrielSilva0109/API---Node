import conexao, { consulta } from "../database/conexao.js"
import bcript from 'bcrypt'

const saltRounds = 10


class UsuarioRepository {

    async create(usuario) {
        try {
            const hashedPassword = await bcrypt.hash(usuario.senha, saltRounds);
            usuario.senha = hashedPassword;
    
            const sql = "insert into usuario SET ?;";
            return await consulta(sql, usuario, 'Não foi possível Cadastrar!');
        } catch (error) {
            // Se houver um erro durante a criação do usuário, lançamos a exceção
            throw new Error('Não foi possível Cadastrar! Erro interno: ' + error.message);
        }
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

        if (result.length > 0) {
            return result[0]
        } else {
            return null
        }
    }

}

export default new UsuarioRepository