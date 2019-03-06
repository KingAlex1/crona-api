const express = require('express');
const router = express.Router();
const checkUser = require('../../handlers/checkUser')
const {create, searchBlog, update, del, getBlog} = require('./controllers/blog-controller')

const Blog = require('./models/blog')

router.post('/blog', checkUser, create)
router.get('/blog',checkUser, searchBlog)
router.put('/blog/:hash', checkUser, update)
router.delete('/blog/:hash', checkUser, del)
router.get('/blog/:hash', checkUser, getBlog)

module.exports = {Blog}
module.exports = router
