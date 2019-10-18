module.exports = app => {
    const {
        existsOrError,
        notExistsOrError
    } = app.api.validation

    const save = (req, res) => {
        const book = {
            ...req.body
        }

        if (req.params.id) {
            book.id = req.params.id
        } else {
            try {
                existsOrError(book.title, 'Titulo não informado')
                //existsOrError(book.shelf, 'Prateleira não informada')
            } catch (msg) {
                console.log(msg)
                return res.status(400).send(msg)
            }
        }

        if (book.id) {
            app.db('groups')
                .update(book)
                .where({
                    id: book.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('groups')
                .insert(book)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        // obter somente com token e os dados que ele pode acessar
        app.db('document_groups')

            .select('document_groups.name as group',
                    'document_collections.name as collection',
                    'document_groups.id as id')
      
            .innerJoin('document_collections', {
                'document_groups.collectionId': 'document_collections.id'
                })

            .then(groups => res.json(groups))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('groups')
            .select('document_groups.id','document_groups.title', 'document_groups.color', 'document_collections.name as shelf')
            .where({
                'groups.id': req.params.id
            })
            .leftJoin('document_collection', {
                'groups.shelf': 'shelves.id'
            })
            .first()
            .then(book => res.json(book))
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
    }

    const deleteWithContent = (req, res) => {
        app.db('groups')
            .delete()
            .where({
                id: req.params.id
            })
            .catch(err => res.status(500).send(err))

        app.db('pages')
            .delete()
            .where({
                book: req.params.id
            })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return {
        save,
        get,
        getById,
        deleteWithContent
    }


}