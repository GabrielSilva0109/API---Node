import conexao, { consulta } from "../database/conexao.js"
import bcrypt from 'bcrypt';

const saltRounds = 10;

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
        if (usuario.senha) {
            const hashedPassword =  bcrypt.hash(usuario.senha, saltRounds);
            usuario.senha = hashedPassword;
        }

        const sql = "UPDATE usuario SET ? WHERE id = ?;"
        return consulta(sql, [usuario, id], 'Não foi possivel Atualizar!')
    }

    delete(id) {
        const sql = "DELETE FROM usuario WHERE id = ?"
        return consulta(sql, id, 'Não foi possivel Deletar!')
    }

    login(email, senha) {
        const sql = "SELECT * FROM usuario WHERE email = ?;";
        const result =  consulta(sql, [email], 'Não foi possível realizar o login');

        if (result.length > 0) {
            const match =  bcrypt.compare(senha, result[0].senha);
            if (match) {
                return result[0];
            }
        }

        return null;
    }

}

export default new UsuarioRepository