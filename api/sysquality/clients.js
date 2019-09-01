module.exports = app => {

    const getAll = (req, res) => {
        app.dbSysQuality('client_tb')
            .select('id_client as id',
                'nome_client as client',
                'email_client as email',
                'telefone_client as telephone')
            .orderBy('id_client', 'desc')
            .then(clients => res.status(200).json(clients))
            .catch(error => res.status(500).send(error))
    }

    const getOne = (req, res) => {
        app.dbSysQuality('client_tb')
            .first()
            .then(client => res.status(200).json(client))
            .catch(error => res.status(500).send(error))
    }

    const create = (req, res) => {
        app.dbSysQuality('client_tb')
            .insert({...req.body})
            .then(_ => res.status(204).json())
            .catch(error => res.status(500).send(error))
    }

    const update = (req, res) => {
        knex('client_tb')
            .update({
                nome_client: req.body.nome_client,
                email_client: req.body.email_client,
                telefone_client: req.body.telefone_client
            })
            .where({
                id_client: req.body.id_client
            })
            .then(_ => res.status(204).send())
            .catch(error => res.status(500).send(error))
    }

    const remove = (req, res) => {
        res.status(404).send()
    }

    return {
        getAll,
        getOne,
        create,
        update,
        remove
    }
}