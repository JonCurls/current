//mongoose model imports
const { User } = require('../models')

const resolvers = {
    Query: {
        helloWorld: () => {
            return 'Hello World!'
        }
    }
}

module.exports = resolvers;