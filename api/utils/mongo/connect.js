const {MONGO_URI} = require('../../config')
const mongooseConnector = require('../../connectors/mongoose-connector')

module.exports = () => mongooseConnector(MONGO_URI)