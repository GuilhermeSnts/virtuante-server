module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req,res) => {
        const client = { ...req.body }

        if(req.params.id) client.id = req.params.id

        try {
            existsOrError(client.name, 'Nome não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (client.id) {
            app.db('clients')
                .update(client)
                .where( { id: client.id})
                .then( _ => res.status(204).send())
                .catch( err => res.status(500).send(err))
        } else {
            app.db('clients')
                .insert(client)
                .then( _ => res.status(204).send())
                .catch( err => res.status(500).send(err))
        }
    }

    const remove = async (req,res) => {
        try {

            const rowsDeleted = await app.db('groups')
                .update({ isActive: 0 })
                .where({ id: req.params.id})
            existsOrError(rowsDeleted, 'Cliente não foi encontrado')
            
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req,res) => {
        app.db('clients')
            .then(clients => res.json(clients))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req,res) => {
        app.db('clients')
            .where({ id: req.params.id })
            .first()
            .then(client => res.json(client))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById }


}