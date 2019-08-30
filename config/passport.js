const authSecret = '!@#sdm123'
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload,node) => {
        app.dbcontsis('tbusuario')
            .where({ c_usuario: payload.id })
            .first()
            .then(user => document(null, user ? {...payload} : false))
            .catch(err => document(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}