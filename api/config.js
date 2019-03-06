const config = require('config');
const {envs} = require('./constants/envs');
const {ENV, IS_TEST} = require('./utils/env');
const dotenv = require('dotenv');

dotenv.config();

if (!IS_TEST) {
    dotenv.config();
}

if (!envs[ENV]) {
    throw Error(`unknown env '${ENV}'`);
}



const PORT = process.env.PORT || config.get('port');
const MONGO_URI = process.env.MONGO_URI || config.get('mongo.uri');
const JWT_SECRET = config.get('jwt.secret');

if (!JWT_SECRET) {
    throw Error("You mast past jwt secret string")
}


module.exports = {
    PORT, MONGO_URI, JWT_SECRET
}