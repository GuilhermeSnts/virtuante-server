module.exports = app => {

    const getAll = (req, res) => {
        app.dbSysQuality('os_tb')
            .select('id_os as id',
                'numero_os as OSNumber',
                'cliente_os as client',
                'abertura_os as createdAt',
                'equipamento_os as productType',
                'status_os as status')
            .orderBy('id_os', 'desc')
            .then(os => res.status(200).json(os))
            .catch(error => res.status(500).send(error))
    }

    const getOne = (req, res) => {
        app.dbSysQuality('os_tb')
            .where({
                id_os: req.params.id
            })
            .first()
            .then(os => res.status(200).json(os))
            .catch(error => res.status(500).send(error))
    }

    const create = async (req, res) => {

        let os = req.body.data

        console.log(req.body)

        let numeroOS = await app.dbSysQuality('os_tb')
            .select('numero_os')
            .orderBy('id_os', 'desc')
            .first()
        let novoRadical = parseInt(numeroOS.numero_os.split("-")[1]) + 1
        let osNumber = novoRadical.toString().padStart(4, "0")

        let fullYear = new Date().getFullYear()
        let year = fullYear.toString().substring(2)

        let newOsNumber = "SQ" + year + "-" + osNumber

        app.dbSysQuality('os_tb').insert({
                ...req.body,
                numero_os: newOsNumber,
                status_os: 'AGUARDANDO AVALIAÇÃO'
            })
            .then(_ => res.status(204).send())
            .catch(_ => res.status(500).send('ocorreu um erro ao gravar no banco de dados'))
    }


    const update = (req, res) => {
        app.dbSysQuality('os_tb')
            .update({
                ...req.body
            })
            .where({
                id_os: req.params.id
            })
            .then(_ => res.status(204).send())
            .catch(error => {
                console.log(error)
                res.status(500).send(error)
            })
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