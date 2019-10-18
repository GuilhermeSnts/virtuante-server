const knex = require('knex')

  const dbSysQuality = knex({
    client: 'mysql2',
    connection: {
      host: 'sql171.main-hosting.eu',
      user: 'u657270620_fast',
      password: 'FwoYfqur4fErwkQokW',
      database: 'u657270620_fast'
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

  // const dbVirtuante = knex({
  //   client: 'mysql2',
  //   connection: {
  //     host: 'localhost',
  //     user: 'root',
  //     password: 'vantspace',
  //     database: 'virtuante_global'
  //   }
  // })

  module.exports = { dbSysQuality, dbVirtuante }