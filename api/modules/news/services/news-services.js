const News = require('../models/news')

module.exports.createNews = async (data) => {

    // const {userHash} = data    
    // const newsCountByUserId = await News.count({userHash})
    // if (newsCountByUserId === 10) {
    //     throw new Error('нельзя создавать больше 10 записей');
    // }
    
    return News.create(data)
}

module.exports.updateNews = (data, news) => {
    news.set(data)
    try {
        return news.save()
    } catch (e) {
        const err = new Error(e)
        next(err)
    }
}

module.exports.search = async ({tags, size, page, title}) => {
    const query = {
        title: { $regex: title },
    };
    if (tags.length) {
        query.tags = {$in: tags}
    }

    const count = await News.count(query)
    const tagList = await News.find({}).select('tags -_id')
    const tagArr =[]
    tagList.forEach((el) => {
        el.tags.forEach((el)=>{
            if(!tagArr.includes(el)){
                tagArr.push(el)
            }
        })

    })
    const pages = Math.ceil(count / size)

    const news = await News
        .find(query)
        .sort({updatedAt: '-1'})
        .limit(size)
        .skip((page - 1) * size)

    return {news, count, pages,tagArr}


}


