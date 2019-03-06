const Blog = require('../models/blog')
const BlogService = require('../services/blog-services')
const parseQueryForSearch = require('../helpers/parseQueryForSearch')

const create = async (req, res, next) => {
    const blogData = {...req.body}
    try {
        const {_id} = await BlogService.createBlog(blogData)
        const blog = await Blog.findOne({_id})
        res.status(201)
        res.send({data: blog})
    } catch (e) {
        res.status(403)
        const err = new Error(e)
        next(err)
    }
}

const searchBlog = async (req, res, next) => {
    const queryParams = req.query
    const filter = parseQueryForSearch(queryParams)
    const {blog, ...rest} = await BlogService.search(filter)
    res.send({data: blog, filter, ...rest})

}

const update = async (req, res, next) => {
    const {
        params: {hash}, body
    } = req

    const blog = await Blog.findOne({hash})

    if (!blog) {
        res.status(404)
        const err = new Error("Запись не найдена")
        next(err)
    }

    const blogData = {...body}
    const updateBlog = await BlogService.updateBlog(blogData, blog)
    res.send({data: updateBlog})
}

const del = async (req, res, next) => {

    const {
        params: {hash}
    } = req

    const blog = await Blog.findOne({hash})
    if (!blog) {
        res.status(404)
        const err = new Error("Запись не найдена")
        next(err)
    }

    await blog.remove()
    res.send({data: {id: blog.hash}})


}


const getBlog = async (req, res, next) => {
    const {params: hash} = req

    const blog = await Blog.findOne(hash);
    console.log(blog)
    res.send({data: blog})

}


module.exports = {
    create, searchBlog, update, del, getBlog
}