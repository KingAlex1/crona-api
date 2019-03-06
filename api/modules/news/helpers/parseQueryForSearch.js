const {MAX_SIZE, PAGE} = require('../constants/pagination')

module.exports = (queryParams) => {
    const search = {
        title: queryParams.title ? queryParams.title : "",
        tags: queryParams.tags ? queryParams.tags.split(',') : [],
        size: parseInt(queryParams.size),
        page: parseInt(queryParams.page)
    }

    if (!search.size || search.size > MAX_SIZE) {
        search.size = MAX_SIZE
    }

    if (!search.page) {
        search.page = PAGE
    }
    return search
}