const { gql } = require("apollo-server-express");

//typeDefs
const typeDefs = gql`
  type Query {
    user(username: String!): User
    users: [User]
    me: User
  }

  type User {
    _id: ID
    username: String
    email: String
    cards: [Card]
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
    addCard(title: String!, link: String!, description: String!): Card
    deleteCard(id: ID!): User
  }
`;

module.exports = typeDefs;
