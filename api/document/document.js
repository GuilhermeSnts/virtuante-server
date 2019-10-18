const authSecret = 'teste'
const jwt = require('jwt-simple')
const md5 = require('md5')

module.exports = app => {
    const {
        existsOrError,
        notExistsOrError
    } = app.api.validation

    const save = (req, res) => {
        const pages = [...req.body]

        if (req.params.id) pages.id = req.params.id
        else {
            for (const page of pages) {
                try {
                    existsOrError(page.name, 'Nome não informado')
                    existsOrError(page.order, 'Ordem não informada')
                    existsOrError(page.book, 'Livro não informado')
                } catch (msg) {
                    return res.status(400).send(msg)
                }
            }
        }

        if (req.params.id) {
            app.db('pages')
                .update(pages[0])
                .where({
                    id: req.params.id
                })
                .then(_ => res.status(204).send())
                .catch(err => {
                    res.status(500).send(err)
                })
        } else {
            app.db('pages')
                .insert(pages)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('pages')
                .where({
                    id: req.params.id
                }).del()

            existsOrError(rowsDeleted, 'Página não encontrada')
            res.status(204).send()

        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('documents')
            .then(documents => res.json(documents))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('documents')
            .where({ id: req.params.id })
            .first()
            .then(document => res.json(document))
            .catch(err => res.status(500).send(err))
    }

    const getByGroup = (req, res) => {

        app.db('documents')
            .select('documents.id', 
                    'documents.name as document', 
                    'documents.order', 
                    'document_groups.name as group')
            .leftJoin('document_groups', {
                'documents.groupId': 'document_groups.id'
            })
            .where({
                groupId: parseInt(req.params.id)
            })
            .then(group => res.json(group))
            .catch(err => res.status(500).send(err))
    }

    const setTree = (documents) => {
        let documentWithTree = documents.map(document => {

            let tree = `${document.collection} > ${document.group} > ${document.name}`
            Object.assign(document, {
                tree: tree
            })
            return document
        })
        return documentWithTree
    }

    const getTree = (req, res) => {

        if (!req.headers.authorization) {
            return res.status(401).send('Token não está presente!')
        }

        const auth = jwt.decode(req.headers.authorization, authSecret)

        app.db('documents')
            .select('documents.id', 'documents.name', 'documents.order',
                'document_groups.name as group', 'document_groups.id as groupId',
                'document_collections.name as collection')
            .leftJoin('document_groups', {
                'documents.groupId': 'document_groups.id'
            })
            .leftJoin('document_collections', {
                'document_groups.collectionId': 'document_collections.id'
            })
            .where({ 'document_collections.clientId' : auth.clientId })
            .then(documents => res.json(setTree(documents)))
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
    }

    return {
        save,
        get,
        remove,
        getById,
        getByGroup,
        getTree
    }


}