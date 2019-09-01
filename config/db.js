const knex = require('knex')

  const dbSysQuality = knex({
    client: 'mysql2',
    connection: {
      host: 'sql171.main-hosting.eu',
      user: 'u657270620_tec',
      password: 'xFxbpm8Lwd1P',
      database: 'u657270620_tec'
    }
  })

  const dbVirtuante = knex({
    client: 'mysql2',
    connection: {
      host: 'sql171.main-hosting.eu',
      user: 'u657270620_tec',
      password: 'xFxbpm8Lwd1P',
      database: 'u657270620_tec'
    }
  })

  module.exports = { dbSysQuality, dbVirtuante }