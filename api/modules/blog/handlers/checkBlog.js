const Blog = require('../models/blog')

// not using
module.exports = async (_id, req, res, next) => {
    const blog= await Blog.findOne({_id})

    if (!blog) {
        const err = new Error("Не найдено")
        res.status(404)
        next(err)
    }
    req.blog = blog

    await next()
}