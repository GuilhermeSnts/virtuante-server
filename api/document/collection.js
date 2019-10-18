const authSecret = 'teste'
const jwt = require('jwt-simple')
const md5 = require('md5')

module.exports = app => {
    const {
        existsOrError,
        notExistsOrError
    } = app.api.validation

    const save = (req, res) => {
        const shelf = {
            ...req.body
        }

        if (req.params.id) shelf.id = req.params.id

        try {
            existsOrError(shelf.name, 'Nome não informado')
            existsOrError(shelf.owner, 'Responsável não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (shelf.id) {
            app.db('shelves')
                .update(shelf)
                .where({
                    id: shelf.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('shelves')
                .insert(shelf)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('document_collection')
            .then(shelves => res.json(shelves))
            .catch(err => res.status(500).send(err))
    }

    const getEntireList = async (req, res) => {

        if (!req.headers.authorization) {
            return res.status(401).send('Token não está presente!')
        }
        const auth = jwt.decode(req.headers.authorization, authSecret)

        const collections = await app.db('document_collections')
            .select('name', 'id')
            .where({ clientId : auth.clientId })
            .catch(err => res.status(500).send(err))

        const groups = await app.db('document_groups')
            .select('name', 'id', 'collectionId as collection')
            .catch(err => res.status(500).send(err))

        const documents = await app.db('documents')
            .select('name', 'id', 'groupId as group')
            .catch(err => res.status(500).send(err))

        let data = collections.map(col => {
            let g = groups.filter( i => i.collection == col.id)
            return {
                name: col.name,
                id: col.id,
                groups: g.map( i => {
                    return {
                        name: i.name,
                        id: i.id,
                        documents: documents.filter( d => d.group == i.id)
                    }
                })
            }
            })
        
        res.status(200).json(data)
    }

    const getById = (req, res) => {
        app.db('shelves')
            .where({
                id: req.params.id
            })
            .first()
            .then(shelf => res.json(shelf))
            .catch(err => res.status(500).send(err))
    }

    const deleteById = (req, res) => {

        app.db('shelves')
            .delete()
            .where({
                id: req.params.id
            })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return {
        save,
        get,
        getById,
        deleteById,
        getEntireList
    }


}