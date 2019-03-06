const keyMirror = require('keymirror')

module.exports.envs = keyMirror({
    development: null,
    production: null,
    test: null,
})