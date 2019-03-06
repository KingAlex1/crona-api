const News = require('../models/news')


// not using
module.exports = async (_id, req, res, next) => {
    const news = await News.findOne({_id})

    if (!news) {
        const err = new Error("Не найдено")
        res.status(404)
        next(err)
    }
    req.news = news

    await next()
}