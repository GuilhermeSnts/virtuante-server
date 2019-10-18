const authSecret = 'teste'
const jwt = require('jwt-simple')
const md5 = require('md5')

module.exports = app => {

    return async (req, res) => {
        console.log(req.body)
        if (!req.body.emailOrUsername || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const emailOrUsername = req.body.emailOrUsername

        const user = await app.db('users')
            .select('username',
                'password',
                'admin_access',
                'clientId')
            .where({ username: emailOrUsername, is_active: 1})
            .orWhere({ email: emailOrUsername, is_active: 1})
            .first()
            .catch( err => {
                console.log(err)
                res.status(500).send('erro ao se comunicar com o banco de dados!')
            })
                
        if (!user) return res.status(400).send('Usuário não encontrado!')

        const password = md5(req.body.password)
        
        if (password != user.password) res.status(400).send('Usuário/Senha inválidos!')

        const now = Math.floor(Date.now() / 1000)
        const payload = {
            username: user.username,
            avatar: user.username.substr(0, 1),
            id: user.id,
            clientId: user.clientId,
            admin_access: user.admin_access.split(','),
            // groups: user.groups.split(','),
            // employer: user.employer,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.status(200).json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })

    }
}