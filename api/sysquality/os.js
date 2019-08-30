module.exports = app => {
    const getAll = (req,res) => {
        res.status(200).json({'all': 'all'})
    }
    const getOne = (req,res) => {
        res.status(200).json({'one': 'one'})
    }
    const create = (req,res) => {
        res.status(204).send()
    }
    const update = (req,res) => {
        res.status(204).send()
    }
    const remove = (req,res) => {
        res.status(204).send()
    }
    return {getAll, getOne, create, update, remove}
}