const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

module.exports = app => {
    
     //Cross Origin Resource Sharing
    app.use(bodyParser.json({
        limit: "5mb",
        extended: true,
        parameterLimit: 50000
    }))
    app.use(logger('tiny'))
    app.use(cors())
    
}