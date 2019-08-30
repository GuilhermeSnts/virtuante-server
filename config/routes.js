// O quanto mais específica for o nome da rota mais para cima ela deve estar,
// para não conflitar os parametros

module.exports = app => {

    app.route('/evento')
        .get(app.sse.init)

    app.post('/login', app.api.auth.login) // Login

}
