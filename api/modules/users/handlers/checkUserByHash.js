const User = require('../models/user')

module.exports = ()=> async (req, res, next, hash) => {

    const user = await User.findOne({hash})
       if (!user) {
        const err = new Error(`Пользователь с хешем ${hash} не найдем`)
        next(err)
    }

    req.user = user
    await next()
}