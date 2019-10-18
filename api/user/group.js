module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req,res) => {
        const group = { ...req.body }

        if(req.params.id) group.id = req.params.id

        try {
            existsOrError(group.name, 'Nome não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (group.id) {
            app.db('groups')
                .update(group)
                .where( { id: group.id})
                .then( _ => res.status(204).send())
                .catch( err => res.status(500).send(err))
        } else {
            app.db('groups')
                .insert(group)
                .then( _ => res.status(204).send())
                .catch( err => res.status(500).send(err))
        }
    }

    const remove = async (req,res) => {
        try {
            const subGroup = await app.db('groups')
                .where({ parentId: req.params.id })

            notExistsOrError(subGroup, 'Grupo possui subgrupos')

            const rowsDeleted = await app.db('groups')
                .where({ id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Grupo não foi encontrado')
            
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const withPath = groups => {
        const getParent = (groups, parentId) => {
            const parent = groups.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }
        const groupsWithPath = groups.map( group => {
            let path = group.name
            let parent = getParent(groups, groups.parentId)

            while(parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(groups, parent.parentId)
            }

            return { ...group, path}
        })

        groupsWithPath.sort((a,b) => {
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })
        return groupsWithPath
    }

    const get = (req,res) => {
        app.db('groups')
            .then(groups => res.json(withPath(groups)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req,res) => {
        app.db('groups')
            .where({ id: req.params.id })
            .first()
            .then(group => res.json(group))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById }


}