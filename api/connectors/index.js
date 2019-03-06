const {MONGO_URI} = require('../config');
const mongooseConnector = require('./mongoose-connector');
const server = require ('../server')


async function connectorsInit() {
    try {
        await mongooseConnector(MONGO_URI);
    } catch (e) {
        server.close();
        console.error(e);
    }
}

module.exports = {
    mongooseConnector,
    connectorsInit
};


