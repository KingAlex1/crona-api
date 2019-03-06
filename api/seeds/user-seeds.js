const faker = require('faker')
const _ = require('lodash')
const User = require('../modules/users/models/user')

module.exports = () => {

    console.log('dddddddd')

    const promises = []
    _.times(20, () => {
        const userPromise  = User.create({
            email: `${faker.lorem.word(1, 20)}-${faker.random.number(0, 999)}@${faker.lorem.word(1, 10)}`,
            name: faker.name.firstName(),           
            password: 1111
        })
        promises.push(userPromise);
    })
    return Promise.all(promises);
}