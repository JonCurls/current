const { gql } = require("apollo-server-express");

//took out username from adduser typedef + mutation

//typeDefs
const typeDefs = gql`
  type Query {
    user(username: String!): User
    users: [User]
    me: User
  }

  type User {
    _id: ID
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
    addUser(email: String!, password: String!): Auth
    addCard(title: String!, link: String!, description: String!): Card
    deleteCard(cardId: ID!): User
  }
`;

module.exports = typeDefs;
