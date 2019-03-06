const express = require('express');
const router = express.Router();
const {signUp, signIn, currentUser} = require('./controllers/auth-controller')
const checkUser = require('../../handlers/checkUser')

router.post('/auth/signup', signUp)
router.post('/auth/signin', signIn)
router.post('/auth/private', checkUser)
router.get('/auth/current-user', checkUser, currentUser)

module.exports = router;