const AppError = function ({status, message, errors, name}) {
    Error.call(this)
    Error.captureStackTrace(this)

    this.message = message;
    this.status = status;
    this.errors = errors;
    this.name = name;
}

module.exports = AppError