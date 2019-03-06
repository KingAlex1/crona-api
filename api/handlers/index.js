const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const {IS_DEV} = require('../utils/env');
const error = require('./error');
const error404 = require('./404');
const jwt = require('./jwt')
// const session = require('./session')

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


module.exports = function (app) {
    if (IS_DEV) {
        app.use(logger('dev'));
    }
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    // app.use(session)

    app.use(session({
        secret: 'secret',
        key: 'keys',
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge:  90000
        },
        saveUninitialized: true,
        resave: false,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    }));

    // app.use(error404)
    app.use(error);
    app.use(jwt());
    


};