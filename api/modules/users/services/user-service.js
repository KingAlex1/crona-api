const User = require('../models/user')

module.exports.createUser = async (data , res, next) => {
    try {
        return await User.create(data)
    } catch (e) {
        res.status(403)
        const err = new Error(e)
        next(err)

    }
}

module.exports.getUserWithPublicFields = (params) => {
    return User.findOne(params).select({
        password: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0
    })
}



