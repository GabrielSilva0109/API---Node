import UsuarioRepository from "../repositories/UsuarioRepository.js"

class UsuarioController {

    async index(req, res) {
        const row = await UsuarioRepository.findAll()
        res.json(row)
    }

    async show(req, res) {
        const id = req.params.id
        const row = await UsuarioRepository.findById(id)
        res.json(row)
    }

    async store(req, res) {
        const usuario = req.body
        const row = await UsuarioRepository.create(usuario)
        res.json(row)
    }
    
    async update(req, res) {
        const usuario = req.body
        const id = req.params.id
        const row = await UsuarioRepository.update(usuario, id)
        res.json(row)
    }

    async delete(req, res) {
        const id = req.params.id
        const row = await UsuarioRepository.delete(id)
        res.json(row)
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body

            // Validação básica
            if (!email || !senha) {
                return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
            }

            // Chamada ao método de login no repositório
            const usuario = await UsuarioRepository.login(email, senha);

            if (usuario) {
                // Usuário autenticado, você pode gerar um token de autenticação aqui, se desejar
                return res.json({ mensagem: "Login bem-sucedido", usuario });
            } else {
                return res.status(401).json({ mensagem: "Credenciais inválidas" });
            }
        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ mensagem: "Erro interno no servidor" });
        }
    }
}

export default new UsuarioController()