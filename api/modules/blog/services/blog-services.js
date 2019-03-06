const Blog = require('../models/blog')

module.exports.createBlog = async (data) => {

    return Blog.create(data)
}

module.exports.updateBlog = (data, blog) => {
    blog.set(data)
    try {
        return blog.save()
    } catch (e) {
        const err = new Error(e)
        next(err)
    }
}


module.exports.search = async ({tags, size, page, title, category}) => {
    const query = {
        title: {$regex: title},
        category: {$regex: category}
    };
    if (tags.length) {
        query.tags = {$in: tags}
    }

    const count = await Blog.count(query)
    const catlist = await Blog.find({}).select('category -_id')
    const tagList = await Blog.find({}).select('tags -_id')
    const catArr = []
    catlist.forEach((el) => {
        if (!catArr.includes(el.category)) {
            catArr.push(el.category)
        }})
    const tagArr =[]
    tagList.forEach((el) => {
        el.tags.forEach((el)=>{
            if(!tagArr.includes(el)){
                tagArr.push(el)
            }
        })
        
    })
    
    const pages = Math.ceil(count / size)

    const blog = await Blog
        .find(query)
        .sort({updatedAt: '-1'})
        .limit(size)
        .skip((page - 1) * size)

    return {blog, count, pages,tagArr, catArr}

}