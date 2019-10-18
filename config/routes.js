// O quanto mais específica for o nome da rota mais para cima ela deve estar,
// para não conflitar os parametros

module.exports = app => {

    app.route('/evento')
        .get(app.sse.init)

    app.post('/signin', app.api.auth.signin) // Login

    app.get('/document-collection/treeview', app.api.document.collection.getEntireList)

    app.route('/user')
        .get(app.api.user.user.get)
        .post(app.api.user.user.save)

    app.route('/user/:id')
        .get(app.api.user.user.getById)

    app.route('/document-collection')
        .get(app.api.document.collection.get)
        .post(app.api.document.collection.save)

    app.route('/document-collection/:id')
        .put(app.api.document.collection.save)
        .get(app.api.document.collection.getById)
        .delete(app.api.document.collection.deleteById)

    app.route('/document-group')
        .get(app.api.document.group.get)
        .post(app.api.document.group.save)

    app.route('/document-group/:id')
        .put(app.api.document.group.save)
        .get(app.api.document.group.getById)
        .delete(app.api.document.group.deleteWithContent)

    app.route('/documents')
        .get(app.api.document.document.get)
        .post(app.api.document.document.save)

    app.route('/documents/tree')
        .get(app.api.document.document.getTree)

    app.route('/documents/group/:id')
        .get(app.api.document.document.getByGroup)

    app.route('/document/:id')
        .put(app.api.document.document.save)
        .delete(app.api.document.document.remove)
        .get(app.api.document.document.getById)
}
