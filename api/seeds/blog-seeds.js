const faker = require('faker')
const _ = require('lodash')
const Blog = require('../modules/blog/models/blog')

module.exports = () => {


    const promises = []

    _.times(500, () => {
        const blogPromise = Blog.create({
            title: faker.lorem.words(2, 5),
            description: faker.lorem.lines(40, 250),
            category: faker.lorem.words(1, 1),
            date: faker.date.past(1),
            image: faker.image.technics(),
            author: faker.name.firstName(),
            tags: faker.lorem.words(3, 7).split(' '),
            comments: [{
                name: faker.name.firstName(),
                email: `${faker.lorem.word(1, 20)}-${faker.random.number(0, 999)}@${faker.lorem.word(1, 10)}`,
                description: faker.lorem.words(5, 20),
                time:faker.date.past(1),
            }, {
                name: faker.name.firstName(),
                email: `${faker.lorem.word(1, 20)}-${faker.random.number(0, 999)}@${faker.lorem.word(1, 10)}`,
                description: faker.lorem.words(5, 20),
                time:faker.date.past(1),
            }, {
                name: faker.name.firstName(),
                email: `${faker.lorem.word(1, 20)}-${faker.random.number(0, 999)}@${faker.lorem.word(1, 10)}`,
                description: faker.lorem.words(5, 20),
                time:faker.date.past(1),
            }]
        })

        promises.push(blogPromise);
    })
    return Promise.all(promises);

}