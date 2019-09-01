module.exports = app => {

    const getAll = (req, res) => {
        app.dbVirtuante('documents')
        .orderBy('id', 'desc')
        .then(documents => res.status(200).json(documents))
        .catch(error => res.status(500).send(error))
    }

    return { getAll }
}