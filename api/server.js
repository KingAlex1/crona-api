const app = require('./app')
const {PORT, MONGO_URI} = require('./config')

const server = app.listen(PORT, function () {
    console.log(`Server running on port: ${PORT}`);

})

module.exports = server