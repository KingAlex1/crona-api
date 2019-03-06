const jwtService = require('../services/jwt-service')
const User = require('../modules/users/models/user')

module.exports = ()=> async (req, res, next) => {
    const {authorization} = req.headers

    if (authorization && authorization !== 'undefined') {

        try {
            const {email} = await jwtService.verify(authorization);
            req.user = await User.findOne({email});
        } catch (e) {
            res.send("Неверный токен")
        }
    }
    await next()
}