const knex = require('knex')

  const dbSysQuality = knex({
    client: 'mysql2',
    connection: {
      host: 'mysql.flexcard.org.br',
      port: 3306,
      user: 'flexcard01',
      password: '123sdm123',
      database: 'flexcard01'
    }
  })

  module.exports = { dbSysQuality }