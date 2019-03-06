const pick = require('lodash')
const News = require('../models/news')
const NewsService = require('../services/news-services')
const parseQueryForSearch = require('../helpers/parseQueryForSearch')

const create = async (req, res, next) => {

    const newsData = {...req.body, userHash: req.user.hash}

    try {
        const {_id} = await NewsService.createNews(newsData)
        const news = await News.findOne({_id})
        res.status(201)
        res.send({data: news})
    } catch (e) {
        res.status(403)
        const err = new Error(e)
        next(err)
    }
}

const update = async (req, res, next) => {

    const {
        params: {hash}, body, user: {hash: _hash},
    } = req;

    const news = await News.findOne({hash})

    if (!news) {
        res.status(404)
        const err = new Error('Новость не найдена')
        return next(err)
    }

    if (news.userHash !== _hash) {
        res.status(403)
        const err = new Error(`Запрещено ! Новость с хешем ${news.hash} создавали не Вы`)
        return next(err)
    }

    const newsData = {...body}
    const updatedNews = await NewsService.updateNews(newsData, news)

    res.send({data: updatedNews})
}

const del = async (req, res, next) => {

    const {params: {hash}, user: {hash: _hash,}} = req

    const news = await News.findOne({hash})

    if (!news) {
        res.status(404)
        const err = new Error("Не найдено")
        return next(err)
    }

    if (news.userHash !== _hash) {
        res.status(403)
        const err = new Error(`Запрещено ! Новость с хешем ${news.hash} создавали не Вы`)
        return next(err)
    }

    await news.remove()

    res.send({data: {id: news.hash}})


}

const getNews = async (req, res, next) => {
    const {params: hash} = req
    const news = await News.findOne(hash)
    res.send({data: news})
}

const searchNews = async (req, res, next) => {

    const queryParams = req.query
    const filter = parseQueryForSearch(queryParams)
    const {news, ...rest} = await NewsService.search(filter)

    res.send({data: news, filter, ...rest})
}

module.exports = {
    create, update, del, getNews, searchNews
}