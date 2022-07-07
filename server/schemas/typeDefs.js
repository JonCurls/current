const { gql } = require("apollo-server-express");

//typeDefs
const typeDefs = gql`
  type Query {
    helloWorld: String
    user(username: String!): User
    users: [User]
  }

  type User {
    _id: ID
    username: String
    email: String
    card: [Card]
  }

  type Card {
    _id: ID
    title: String
    link: String
    description: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
