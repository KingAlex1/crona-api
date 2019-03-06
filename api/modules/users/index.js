const express = require('express')
const router = express.Router()
const checkUser = require('../../handlers/checkUser')
const User = require('./models/user')
const UsersController = require('./controllers/user-controller')
const checkUserByHash = require('./handlers/checkUserByHash')


router.param('hash',checkUserByHash())
router.get('/user/:hash/news' , UsersController.getNewsByUserHash)

module.exports = router
