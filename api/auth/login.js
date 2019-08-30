const authSecret = 'teste'
const jwt = require('jwt-simple')
const md5 = require('md5')

module.exports = app => {

    return async (req, res) => {

        if (!req.body.username || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const username = req.body.username
        

        const user = await app.SysQuality('tbusuario')
            .select('c_usuario','login', 'vendedor', 'analisador', 's_usuario')
            .where({
                login: username.toUpperCase(),
                inativo: 0,
                acesso_venda_web: 1,
                })
                .first()
                .catch( _ => res.status(500).send('erro ao se comunicar com o banco de dados!'))
        
        console.log(user)
        
        if (!user) return res.status(400).send('Usuário não encontrado!')

        const password = md5(req.body.password.trim().toUpperCase() + user.c_usuario + 'NEWIP')
        
        if (password != user.s_usuario) res.status(400).send('Usuário/Senha inválidos!')

        const now = Math.floor(Date.now() / 1000)
        const payload = {
            user: user.login,
            avatar: user.login.substr(0, 1),
            id: user.c_usuario,
            vendedor: Boolean(user.vendedor),
            analisador: Boolean(user.analisador),
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })

    }
}