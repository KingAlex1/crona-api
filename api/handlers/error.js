const error = async (err,req, res, next) => {
    console.log('erroreeeeeeeeeee',err)
    try {
        await next();
    } catch ({status = 500, message = 'Server Error', name, errors}) {
        if (name === 'ValidationError') {
            res.status(400);
            res.send({
                errors: Object.values(errors).reduce((errors, error) => ({
                    ...errors,
                    [error.path]: error.message,
                }), {}),
            })
        } else {
            res.status(status)
            res.send({status, message})
        
        }
    }
}


module.exports = error