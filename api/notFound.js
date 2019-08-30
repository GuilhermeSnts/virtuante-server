module.exports = app => {
    return (req, res) => {
        res.status(404).send('Não há nada para ver aqui')
    }
}