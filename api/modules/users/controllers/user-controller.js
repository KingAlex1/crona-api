const UserService = require('../services/user-service')
const News = require('../../news/models/news')



module.exports.getNewsByUserHash = async (req, res) => {
    const {user: {hash: userHash}} = req
  const news = await News.find({userHash})

    res.send({data: news})
}
