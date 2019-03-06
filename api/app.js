const express = require('express');
const {connectorsInit} = require('./connectors')
const initHandlers = require('./handlers')
const modules = require('./modules')


connectorsInit()
const app = express();
initHandlers(app)
app.use(modules)

require('./webSocket')

app.use(function (req, res) {

})

module.exports = app;
