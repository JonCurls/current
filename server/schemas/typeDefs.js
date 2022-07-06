const { gql } = require('apollo-server-express');

//typeDefs
const typeDefs = gql`
type Query {
    helloWorld: String
}`;

module.exports = typeDefs;