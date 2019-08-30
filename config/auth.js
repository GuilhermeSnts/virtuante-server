const authSecret = 'teste'
const jwt = require('jwt-simple')
const md5 = require('md5')

module.exports = app => {

    const signinClient = async (matricula) => {

        const user = await app.dbcontsis('cliente')
            .where({ c_cliente: matricula })
            .first()

        if (!user) return res.status(400).send('Usuário não encontrado!')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })

    }

    const signin = async (req,res) => {

       //verificar se é cliente ou usuário
       if (req.body.matricula) {
           signinClient(req.body.matricula)
       } else {
           res.status(400).send('informe a matricula!')
       }

    }

    return { signin }
}