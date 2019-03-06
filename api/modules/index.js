const express = require('express');
const router = express.Router();
const auth = require('./auth')
const news = require('./news')
const users = require('./users')
const blog = require('./blog')

router.use(auth)
router.use(news)
router.use(users)
router.use(blog)

module.exports = router