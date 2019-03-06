module.exports = async (req, res, next) => {
    console.log(req.user)
    if (!req.user) {
        res.send('Запрещено')
    } else {
        await next()
    }
}