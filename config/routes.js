// O quanto mais específica for o nome da rota mais para cima ela deve estar,
// para não conflitar os parametros

module.exports = app => {

    app.route('/evento')
        .get(app.sse.init)

    app.get('/', app.api.notFound)
    app.post('/signin', app.api.auth.signin) // Login
    
    app.get('/documents', app.api.documents.getAll)

    //SYS QUALITY
 
    app.route('/sysquality/os')
        .get(app.api.sysquality.os.getAll)
        .post(app.api.sysquality.os.create)
        
    app.route('/sysquality/os/:id')
        .get(app.api.sysquality.os.getOne)
        .put(app.api.sysquality.os.update)
        .delete(app.api.sysquality.os.remove)

    app.route('/sysquality/clients')
        .get(app.api.sysquality.clients.getAll)
        .post(app.api.sysquality.clients.create)
        
    app.route('/sysquality/clients/:id')
        .get(app.api.sysquality.clients.getOne)
        .put(app.api.sysquality.clients.update)
        .delete(app.api.sysquality.clients.remove)

    app.post('/sysquality/rat', app.api.sysquality.rat.getAll)
    app.route('/sysquality/rat/:id')
        .get(app.api.sysquality.rat.getOne)
        .put(app.api.sysquality.rat.update)
        .delete(app.api.sysquality.rat.remove)
}
